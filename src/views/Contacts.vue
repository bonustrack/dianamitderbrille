<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Messages</h2>
    <div v-if="contacts !== false">
      <router-link
        to="/messages/dianamitderbrille"
        class="d-flex border-bottom v-align-middle p-4"
        v-for="(contact, i) in contacts"
        :key="i"
      >
        <Avatar :ipfsHash="contact.user_meta.avatar" class="mr-4" />
        <div>
          <div class="text-white" v-text="contact.user_meta.name" />
          <div class="text-gray" v-text="contact.last_message" />
        </div>
      </router-link>
    </div>
    <VueLoadingIndicator v-else class="p-4" />
  </div>
</template>

<script>
export default {
  computed: {
    contacts() {
      return this.$store.state.settings.contacts;
    }
  },
  async created() {
    if (!this.contacts) await this.$store.dispatch('getContacts');
  }
};
</script>
