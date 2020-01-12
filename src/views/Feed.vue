<template>
  <Layout title="Home">
    <Write />
    <div class="pl-lg-5 pb-6">
      <div class="d-flex border-bottom pr-lg-5 py-5" v-for="(item, i) in items" :key="i">
        <div>
          <Avatar class="mr-3" />
        </div>
        <div class="flex-auto">
          <p>@{{ item.username }} {{ i + 1 }}d</p>
          <img class="avatar width-full mb-4" :src="item.image" />
          <p v-text="item.body" />
          <i class="iconfont iconlove mr-3" />
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          username: 'dianamitderbrille',
          body: 'Big Buddha ♥',
          image:
            'https://instagram.fbkk5-3.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/79685692_497771590943189_8684923661089324064_n.jpg?_nc_ht=instagram.fbkk5-3.fna.fbcdn.net&_nc_cat=105&_nc_ohc=60r0uZGBG-EAX9rBJ2p&oh=3397833439c914d7e00303e94b0f2ae4&oe=5EA4DEA6'
        },
        {
          username: 'dianamitderbrille',
          body: 'Abu Dhabi ♥️',
          image:
            'https://instagram.fbkk5-1.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/78990837_193731701796681_4615911782044591922_n.jpg?_nc_ht=instagram.fbkk5-1.fna.fbcdn.net&_nc_cat=109&_nc_ohc=ZN-jCctFR_cAX-rFm8u&oh=fceea637d8207c7de9d6d6ee3a044107&oe=5EADA32C'
        }
      ]
    };
  }
};
</script>
