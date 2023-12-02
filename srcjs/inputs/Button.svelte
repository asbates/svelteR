<svelte:options accessors={true}/>
<script>
    import 'Shiny'
    export let id;
    export let label;

    export let shinyInputValue = 0

    function increment() {
        shinyInputValue += 1
    }
</script>

<button class="sv-btn" id={id} on:click={increment} on:click>{label}</button>
