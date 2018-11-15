package main

import (
	"bufio"
	"encoding/csv"
	"fmt"
	"os"
	"strings"
	"time"
	"github.com/go-pg/pg"
)

const (
	user     = "kai"
	password = "kainan"
	dbname   = "neighborhood"
)

func panicIf(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	start := time.Now()
	db := pg.Connect(&pg.Options{
		User:     user,
		Password: password,
		Database: dbname,
	})
	fmt.Println("Postgres connected")
	csvFile, _ := os.Open("data.csv")
	r := csv.NewReader(bufio.NewReader(csvFile))
	r.FieldsPerRecord = -1
	csvData, err := r.ReadAll()
	panicIf(err)
	str := ""
	for n := 0; n < len(csvData); n++ {
		str += strings.Join(csvData[n], ",")
		str += "\n"
	}
	r2 := strings.NewReader(str)

	_, err = db.CopyFrom(r2, `COPY listings ("hostfirstname","listinglat","listinglong","neighbid","neighbdesc","gettingarounddesc") FROM STDIN DELIMITER ',' CSV`)
	panicIf(err)
	t := time.Now()
	elapsed := t.Sub(start)

	fmt.Println("Postgres copy success at", elapsed)

	defer db.Close()
}
