#' Svelte List
#'
#' An example output using a svelte component.
#'
#' @param id The id for list.
#' @param items The items to include in the list.
#'
#' @export
svelteList <- function(items) {

  list(shinyOutputValue = items)
}

#' Create a svelte list output.
#'
#' @param id The id for the output.
#'
#' @export
svelteListOutput <- function(id) {
  props <- list(id = id, shinyOutputValue = c())
  htmltools::tags$div(
    id = glue::glue("{id}-container"),
    htmltools::tags$ul(id = id),
    htmltools::tags$script(
      id = glue::glue("{id}-script"),
      glue::glue(
        "window.svelteR.svList(<jsonlite::toJSON(props, auto_unbox = TRUE)>)",
        .open = "<",
        .close = ">"
      )
    )
  )
}

#' Render a svelte list.
#'
#' @param expr Expression to evaluate. Needs to return a `[svelteList()]`.
#' @param env The parent environment for the expression.
#' @param qutoed Is the expression quoted?
#'
#' @export
renderSvelteList <- function(expr, env = parent.frame(), quoted = FALSE) {
  func <- shiny::exprToFunction(expr, env, quoted)
  function() {
    func()
  }
}

