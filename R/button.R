#' Svelte Button
#'
#' An example input using a svelte component.
#'
#' @param id The id for button.
#' @param label The label for the button
#'
#' @export
svelteButton <- function(id, label) {
  props <- list(id = id, label = label)

  htmltools::tags$div(
    id = glue::glue("{id}-container"),
    htmltools::tags$button(id = id),
    htmltools::tags$script(
      id = glue::glue("{id}-script"),
      glue::glue(
        "window.svelteR.svButton(<jsonlite::toJSON(props, auto_unbox = TRUE)>)",
        .open = "<",
        .close = ">"
      )
    )
  )
}
