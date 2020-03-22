<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Messages</h2>
    <div v-if="contacts !== false">
      <router-link
        v-if="contacts.length === 0"
        to="/dianamitderbrille"
        class="d-flex border-bottom v-align-middle p-4 text-white"
      >
        Subscribe to start a conversation
      </router-link>
      <router-link
        v-else
        class="d-flex border-bottom v-align-middle p-4"
        v-for="(contact, i) in contacts"
        :key="i"
        :to="`/messages/${contact.username}`"
      >
        <Avatar :ipfsHash="contact.meta.avatar" class="mr-4" />
        <div>
          <div class="text-white" v-text="contact.meta.name" />
          <div class="text-gray" v-text="contact.last_message || ''" />
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
      return this.$store.state.messenger.contacts;
    },
    messages() {
      return this.$store.state.messenger.messages;
    }
  },
  async created() {
    if (!this.contacts) await this.$store.dispatch('getContacts');
  }
};
</script>
