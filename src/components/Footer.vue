<template>
  <div class="py-5 border-top">
    <div class="container-lg p-responsive d-flex">
      <div class="flex-auto">
        {{ pkg.name }} © 2020
      </div>
      <div>
        <a v-for="(link, i) in links" :href="link" class="text-white" target="_blank">
          <Icon :name="i" class="ml-4" />
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import pkg from '@/../package.json';

export default {
  data() {
    return {
      pkg,
      links: {
        instagram: 'https://www.instagram.com/dianamitderbrille__',
        facebook: 'https://www.facebook.com/profile.php?id=100005515518488',
        amazon: 'https://www.amazon.com/gp/registry/wishlist/1ZLGDOANI46KD/ref=cm_wl_huc_view'
      }
    }
  }
}
</script>
