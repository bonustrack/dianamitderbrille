<template>
  <div>
    <router-link to="/messages/dianamitderbrille" class="d-flex border-bottom v-align-middle p-4" v-for="contact in contacts">
      <Avatar class="mr-4" />
      <div>
        <div class="text-white">Diana Tamara Höfler</div>
        <div class="text-gray">Bla bla bla</div>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contacts: [{

      }]
    };
  }
};
</script>
