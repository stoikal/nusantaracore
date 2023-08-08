package main

import (
	"bufio"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	supa "github.com/nedpals/supabase-go"
)

func main() {
	godotenv.Load(".env.local")

	supabaseUrl := os.Getenv("SUPABASE_URL")
	supabaseKey := os.Getenv("SUPABASE_ANON_KEY")
	supabase := supa.CreateClient(supabaseUrl, supabaseKey)

	var results []map[string]interface{}
	err := supabase.DB.From("groups").
		Select("title, albums (title, year, youtube, spotify, artists (name))").
		Execute(&results)
	if err != nil {
		panic(err)
	}

	file, err := os.Create("README.md")
	if err != nil {
		fmt.Println("Error creating file:", err)
		return
	}
	defer file.Close()

	writer := bufio.NewWriter(file)
	writer.WriteString("# Nusantaracore" + "\n\n")

	for _, group := range results {

		writer.WriteString("## " + group["title"].(string) + "\n")

		for _, item := range group["albums"].([]interface{}) {
			album := item.(map[string]interface{})
			year := album["year"]
			artists := album["artists"].([]interface{})
			youtube := album["youtube"]
			spotify := album["spotify"]

			entry := ""

			entry += "* " + album["title"].(string) + " "

			if len(artists) > 0 {
				entry += "- "

				for index, item := range artists {
					artist := item.(map[string]interface{})
					entry += artist["name"].(string)

					if index+1 < len(artists) {
						entry += ","
					}

					entry += " "
				}
			}

			if year != nil {
				entry += fmt.Sprintf("(%.0f) ", year)
			}

			if youtube != nil {
				entry += fmt.Sprintf("[youtube](%s) ", youtube)
			}

			if spotify != nil {
				entry += fmt.Sprintf("[spotify](%s) ", spotify)
			}

			entry += "\n"

			writer.WriteString(entry)
		}

		writer.WriteString("\n")
	}

	writer.Flush()
}
