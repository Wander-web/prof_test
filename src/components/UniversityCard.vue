<template>
  <div class="university">
    <div class="university__image">
      <img :src="baseURL  + 'media/'+ university_spec.university.image" :alt="university_spec.university.name">
    </div>
    <div class="university__name" v-html="university_spec.university.name"/>
    <div class="university__description" v-html="university_spec.university.description"/>
    <a class="university__specialization" @click.stop :href="university_spec.site">{{university_spec.speciality.code}} {{university_spec.speciality.name}}</a>
    <div class="university__footer">
      <a :href="university_spec.university.site" @click.stop><img src="../assets/akar-icons_link-chain.svg">{{ site_url }}</a>
      <span>{{university_spec.university.city}}</span>
    </div>
  </div>
</template>

<script>
import {baseURL} from "@/services/api";
export default {
  name: "UniversityCard",
  props: ["university_spec"],
  data() {
    return {
      baseURL,
    }
  },
  computed: {
    site_url() {
      let site = new URL(this.university_spec.university.site)
      return site.hostname
    }
  }
}
</script>

<style lang="scss" scoped>
.university {
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 40px;
  width: 259px;
  height: 320px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__image {
    width: 100%;
    height: 123px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 40px 40px 0 0;
    }
  }

  &__name {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    padding: 0 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    height: 48px;
    -webkit-box-orient: vertical;

  }
  &__description {
    font-weight: 300;
    font-size: 13px;
    line-height: 16px;
    padding: 0 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__specialization {
    text-transform: uppercase;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    text-align: center;
    color: black;
    margin-top: 13px;
    padding: 0 10px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  &__footer {
    display: flex;
    width: 220px;
    padding: 0 32px 0 10px;
    align-items: center;
    position: absolute;
    bottom: 10px;
    justify-content: space-between;

    a {
      text-decoration: none;
      color: black;
      font-weight: 500;
      font-size: 16px;
      display: flex;
      padding-right: 10px;
      line-height: 19px;
      img {
        width: 15px;
        height: 14px;
        margin-left: 10px;
      }
    }

    span {
      font-weight: 500;
      font-size: 14px;
      line-height: 17px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }


}
</style>