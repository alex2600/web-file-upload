<template>
    <div>
        <nav id="nav">
            <router-link to="/upload">Upload</router-link>
            |
            <router-link to="/file-list">FileList</router-link>
            |
            <router-link to="/media">Media</router-link>
            |
            <router-link to="/stats">Stats</router-link>
        </nav>
    </div>
   <!--    <div style="position:absolute; right: 0; top:0;z-index: 8888; background-color:#777;">-->
   <!--        <a @click.prevent="load">direct link to files</a>-->
   <!--    </div>-->
</template>

<script setup>

// async function load () {
//    try {
//       const res = await fetch("http://localhost:3002/api/file/list")
//       console.log(res)
//        console.log(await res.headers.values().next())
//    } catch (ex) {
//       console.error(ex)
//    }
// }

</script>

