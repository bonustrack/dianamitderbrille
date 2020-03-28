<template>
  <div>
    <div class="top-0 left-0 p-4 position-absolute">
      <img src="~/@/assets/logo.svg" style="max-width: 200px;" />
    </div>
    <div class="top-0 right-0 p-4 position-absolute">
      <a v-if="$i18n.locale === 'en'" @click="changeLocale('de')">
        <img
          height="32"
          width="32"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAV1BMVEVHcExCNUM6N0TjJDCLeDY6NkTv0y50MkDrmzGuaTY6NkTw1C/jJS/v1C3v0y3rxSzu0i3kJjDnJzLlby06NkXkJjDz1zDhJS/v1C7lJzHmJzHs0SzgJC4GK3kCAAAAFHRSTlMApm+mCN/q0NEYPjxfgsuuZND89znMEqIAAAGqSURBVFjD1ZjbcoMgEIYDAi1y1MFDTN//OWvjodGgAksv+pnMZHLxzc8mIru32/+ClxiN0PGNS54qwYi6DRThaBnByHlBmESFoe4QGqwiZ5oIVXmhearK6zjIBYEuQnHqAqEcuqyQ5ZUuhmNTnGekzOQ5yMSpizf5Kp7gGU3v/wLkksDwAvkLTmiqaLc47JLBeQJtIxFAoE0kSKBNJFCg1x8OfYBA681RDyDq5UaRAxA5iwqoqJhFFVRUzSW6D3cQwzAVSd7ByLyiAi6aql00UOpcomYSVVBNV1d5RE2Xa2lD5hoV8BpNItmBkXlFHC6ad7YKqGmqZWODBlo2NvkFZNlqeQcUrack8wnCrM8124Kwv49sBvGwl1OEgojU67GG5QkEimS3Zz/d9klXq3eHUfH8Nv7Vi/2x9mdxCSr13qjpPgHtads4i/cwb9Mmok1M+NujWNNDHDVso+kRfjFx3ELGZDrzjBXXj0D01XRDhXnU9QBBBITSImikYdm5hqngWY1iZ5qYeQ2xxq8xlkQPoqzZ5WLGJk+1hFXGaG2MsiJVMi2RvH/6Y74BF3czEVHEIPMAAAAASUVORK5CYII="
        />
      </a>
      <a v-else @click="changeLocale('en')">
        <img
          height="32"
          width="32"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAAgVBMVEVHcEzVVl3kUlrfIizZJTDi0tLv6OrqnKDqrrHhMTs4cp/sW2PabHUNVYzfIy3u7u4OVIwgYpXeIivkVFzp6OgOVozXHijbHyrhfYLu7u7s7Ozz8/MOVo3nJzHkJjDl5uYOVYvbICrgJC7WHCYNU4kfYZSrwtJOgalymrnJ1uGRsMdEnKvdAAAAGnRSTlMAxsa25dDaxc7w/tgWblp5tSp2NjLk64ycSzXWOx8AAAJqSURBVFjD1ZjrkqIwEIXdjTIjyyWAokNAImu4+P4PuJiAQyA3yFZt7YmW50++appOTGe3+78U+b4PIQQAXOLA2wjxfOjmTAXTEWyA+TDPm5YHvQSCdcGc++lthmoyB/VxxcZhUUyvDpF8CXqhzBI8YHLSuA1zn3MdTgbh5BNhTH/QUqEuHJgLJAAhR5mpqBnncgYJSYrHi9yuobVDeCMEoUxKikiNOjafNx8SJbLXhduuxlS8KSQ6JhJO7mKXzedNISWJMg77aTkexBspqACC+pFRlKBiUeRRX8jvip6bXwrN03Ru666lS2tpJK9/KKf5wiAlYgEsjRI0Wyz9G6ufDUvMwmAlKPO4TGOSY0JnLY0axIV0xkqpQeUkIDJOEZtCre/dFz7HihEbDehdlVGd1TStrsQoMbeiGNPtt2hcomJTGD4bbJsnnfWQmMLw2c7yVcaMo9OQIqwT0snjQPIaQJlmfI1l/cpG02KJ0UcUTkBtltVEbCgoU3wHEHxQdRmRmZ86XSeg/g/alZjHTScwjUghQxC4Wesvg64f1mLJDjNkO8IBZC0G+rIHsSXi2YOGne3TWsN+BKrqZvGpqnFjCypLjVutZwt6/9cCO873ISk4WmnSnjg27356sOmLu9w4xrIeVG4n8SetcHtEs67EKTdqdvTbJfuNWpzZL/f7vVo/LsuDNrhvEBA1svv1nL2waUvStZxU0h4lh5VKZA3baVURqFrINSRH2Wl7B1POQXeNEJpxQn3jf7r+0Op6MrqLiNPfSqWx8SWLCpXGq+5+AiDGrLv2YWEFYBZXCrbfagXxBVBZXI39K/0Bndp6I+VjXGAAAAAASUVORK5CYII="
        />
      </a>
    </div>
    <div class="hero py-10">
      <div class="container-lg p-responsive pt-10">
        <div class="col-md-5">
          <h6 class="eyebrow mb-4">Diana mit der brille</h6>
          <h1 class="mb-4" v-text="$t('hero_title')" />
          <router-link to="/signup" class="btn-mktg mb-3">Subscribe</router-link>
          <p>Or, <router-link to="/login">log in</router-link></p>
        </div>
      </div>
    </div>
    <div class="container-lg p-responsive overflow-hidden">
      <div class="overflow-hidden py-10 border-bottom">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 text-center">
          <div class="bg-blue mx-auto ml-2 hide-sm hide-md rounded-2" style="height: 260px;" />
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <h6 class="eyebrow mb-4">Was bietet dir meine Seite?</h6>
          <h2>Title 1</h2>
          <h5>
            Täglich neue Bilder und Videos die von Erotik bis zur Pornografie reichen! Du hast
            ausserdem die Möglichkeit, Wunschbilder und Videoanfragen zu stellen.
          </h5>
        </div>
      </div>
      <div class="overflow-hidden py-10">
        <div class="col-md-6 float-left pr-md-6 pr-lg-6 mb-6">
          <h6 class="eyebrow mb-4">Subtitle 2</h6>
          <h2>Subscription bundles</h2>
          <h5>
            Das kannst du jederzeit über die Privatnachrichtenfunktion machen, jede Nachricht wird
            von mir persönlich beantwortet, denn ich bin täglich mehrmals online und habe genügend
            Zeit.
          </h5>
        </div>
        <div class="col-md-6 float-left pl-md-6 pl-lg-6">
          <Plans class="border rounded-2 overflow-hidden px-4 py-6 " />
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { LOCALE_LOCALSTORAGE_KEY } from '@/helpers/utils';

export default {
  methods: {
    changeLocale(locale) {
      localStorage.setItem(LOCALE_LOCALSTORAGE_KEY, locale);
      this.$i18n.locale = locale;
    }
  }
};
</script>

<style scoped lang="scss">
.hero {
  background-image: linear-gradient(rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.4)),
    url('https://gateway.pinata.cloud/ipfs/QmQyvkEP3gSccRKWYxvesZV8TgiiDDEMrsieeR36UCsCb4');
  background-size: cover;
  background-position: center;
}
</style>
