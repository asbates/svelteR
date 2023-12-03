# devtools::install(".")
library(shiny)
library(svelteR)

ui <- function() {
  tagList(
    svelteRDependency(),
    svelteButton("mybtn", "svelte button"),
    textOutput("btn_value"),
    svelteListOutput("mylist")
  )
}

server <- function(input, output , session) {
  output$btn_value <- renderPrint({
    input$mybtn
  })

  observeEvent(input$mybtn, {
    output$mylist <- renderSvelteList({
      svelteList(items = sample(letters, 4))
    })
  })
}

shinyApp(ui, server)
