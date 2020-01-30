<template>
  <div class="pb-8">
    <Cover :key="$route.params.username" :username="$route.params.username" />
    <Stories :key="`_${$route.params.username}`" :username="$route.params.username" />
  </div>
</template>
