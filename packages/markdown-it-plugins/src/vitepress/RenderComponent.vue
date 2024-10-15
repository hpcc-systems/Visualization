<template>
    <div>
    </div>
</template>

<script>
import { render } from "@hpcc-js/markdown-it-plugins";

export default {
    name: 'RenderComponent',
    props: {
        content: {
            type: String,
            required: true
        },
    },
    data() {
        return {
            loading: true
        };
    },
    async created() {
        setTimeout(() => {
            this.loading = false;
            render(JSON.parse(decodeURI(this.content)));
        }, 0);
    }
}
</script>

<style scoped>
/* Add your styles here */
</style>