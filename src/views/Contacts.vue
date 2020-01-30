<template>
  <div>
    <h2 class="p-4 border-bottom mb-0">Messages</h2>
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
</template>

<script>
export default {
  data() {
    return {
      contacts: [
        {
          user_meta: {
            name: 'Diana Tamara Höfler',
            avatar: 'QmNZz6n2LYLAUwnDvGi79CFj5UJNGgyRyV6758nCtajUHJ'
          },
          last_message: 'How are you?'
        }
      ]
    };
  }
};
</script>
