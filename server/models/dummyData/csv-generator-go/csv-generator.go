package main

import (
	"encoding/csv"
	"fmt"
	"math/rand"
	"os"
	"strconv"
	"time"

	"github.com/icrowley/fake"
)

func main() {
	start := time.Now()

	csvfile, err := os.Create("data.csv")
	if err != nil {
		panic(err)
	}
	defer csvfile.Close()

	writer := csv.NewWriter(csvfile)

	for i := 0; i < 10000000; i++ {
		var name = fake.FirstName() + " " + fake.LastName()
		var lat = strconv.FormatFloat(rand.Float64()+51.0, 'f', 3, 64)
		var long = strconv.FormatFloat(rand.Float64()-1.0, 'f', 3, 64)
		var neighbID = strconv.Itoa(rand.Intn(15) + 1)
		var desc1 = fake.Paragraph()
		var desc2 = fake.Paragraph()
		row := []string{name, lat, long, neighbID, desc1, desc2}
		err := writer.Write(row)
		if err != nil {
			panic(err)
		}
		if i % 1000 == 0{
			fmt.Println(i)
		}
	}

	writer.Flush()

	t := time.Now()
	elapsed := t.Sub(start)
	fmt.Println("CSV generation success at", elapsed)
}
