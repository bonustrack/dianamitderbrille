<template>
  <div>
    <Cover class="border-bottom" />
    <div>
      <Write class="border-bottom p-responsive" />
      <div class="border-bottom">
        <Story v-for="(item, i) in items" :key="i" :item="item" class="p-responsive" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          username: 'dianamitderbrille',
          body: 'Singapore ♥️',
          image: 'Qmc7UJhrMqgQqib5voE6Sq19r1PsPwc3QtbmFvuwEnS3Yv'
        },
        {
          username: 'dianamitderbrille',
          body:
            'Singapore ♥️ Bilder die für Insta zu heiss sind, findet ihr auf meiner +18 Seite ♥️♥️♥️',
          image: 'QmXe9HtkVSbdoNHskyrmyR4Rcg7vDLojss4Z9Y4k2uYD43'
        }
      ]
    };
  }
};
</script>
