package main

import (
	"fmt"
	"net/http"
	"text/template"
)

func index(w http.ResponseWriter, r *http.Request) {

	template, err := template.ParseFiles("index.html")

	if err != nil {
		fmt.Fprintf(w, "Pagina no encontrada")
	} else {
		template.Execute(w, nil)
	}

}

func main() {
	http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
	http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
	http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))
	http.Handle("/src/", http.StripPrefix("/src/", http.FileServer(http.Dir("src/"))))
	http.Handle("/jstree/", http.StripPrefix("/jstree/", http.FileServer(http.Dir("jstree/"))))

	http.HandleFunc("/", index)

	fmt.Printf("Servidor escuchando en: http://localhost:3000/")
	http.ListenAndServe(":3000", nil)
}
