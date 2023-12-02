# devtools::install(".")
library(shiny)
library(svelteR)

ui <- function() {
  tagList(
    svelteRDependency(),
    svelteButton("mybtn", "svelte button"),
    textOutput("btn_value")
  )
}

server <- function(input, output , session) {
  output$btn_value <- renderPrint({
    input$mybtn
  })
}

shinyApp(ui, server)
