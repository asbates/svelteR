<svelte:options accessors={true}/>
<script>
    export let id;
    export let shinyOutputValue = ["Item 1", "Item 2"]
</script>

<ul id={id} class="svelte-list">
    {#each shinyOutputValue as item}
    <li>{item}</li>
    {/each}
</ul>
