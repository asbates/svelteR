
# svelteR

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
<!-- badges: end -->

`svelteR` allows you to use [Svelte](https://svelte.dev/) components in your Shiny applications. It was inspired by [reactR](https://react-r.github.io/reactR/) and [vueR](https://vue-r.github.io/vueR/).

## Status

Right now `svelteR` is experiemental, thus subject to change.
You can make input bindings at the moment but not widgets, although I do plan on adding widget support.

## Installation

You can install the development version of svelteR from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github("asbates/svelteR")
```

## Example

An example Svelte component is included in the package (`?svelteButton`).
And an example Shiny application is included in `/app.R`.

