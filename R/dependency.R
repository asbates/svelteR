#' svelteR Dependency
#'
#' Adds needed dependencies. Call this in your apps UI.
#'
#' @export
svelteRDependency <- function() {
  htmltools::htmlDependency(
    name = "svelteR",
    version = "0.0.1",
    src = system.file(package = "svelteR"),
    script = "svelteR.js"
  )
}
