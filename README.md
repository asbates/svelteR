
# svelteR

<!-- badges: start -->
[![Lifecycle: experimental](https://img.shields.io/badge/lifecycle-experimental-orange.svg)](https://lifecycle.r-lib.org/articles/stages.html#experimental)
<!-- badges: end -->

`svelteR` allows you to use [Svelte](https://svelte.dev/) components in your Shiny applications. It was inspired by [reactR](https://react-r.github.io/reactR/) and [vueR](https://vue-r.github.io/vueR/).

## Status

Right now `svelteR` is experimental, thus subject to change.
You can make input bindings and output bindings.

I don't make any claims regarding robustness yet nor is there much documentation.
These are on the to do list.

## Installation

You can install the development version of svelteR from [GitHub](https://github.com/) with:

``` r
# install.packages("devtools")
devtools::install_github("asbates/svelteR")
```

## Example

An example Svelte component input is included in the package (`?svelteButton`).
An example output component is included in the package as well (`?svelteList`).
And an example Shiny application using these components is included in `/app.R`.

