# Observable

**Class**: `Observable`

<ClientOnly>
  <hpcc-vitepress style="width:100%;height:600px">
    <div id="placeholder" style="width:100%;height:600px">
    </div>
    <script type="module">
        import { Observable } from "@hpcc-js/observable-md";
        
        const observable = new Observable()
            .target("placeholder")
            .showValues(true)
            .mode("omd")
            .text(`
            # Hello World

            \`\`\`
            hw = 'Hello' + ' World';            
            tick = {                           
              let i = 0;                       
              while (true) {                   
                yield ++i;                     
              }                                
            }
            \`\`\`
            `)                                  
            .render()
            ;
    </script>
  </hpcc-vitepress>
</ClientOnly>

::: tip
See [Getting Started](../README) for details on how to include @hpcc-js/observable-md in your application
:::

## `Observable`

## Events

## Credits
