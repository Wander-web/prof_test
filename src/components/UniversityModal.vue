<template>
  <div class="modal" v-if="openModal" @click.stop="closeModal">
    <div class="modal__content" @click.stop>
    <div class="modal__header">
      <img :src="baseURL  + 'media/'+ university.image" :alt="university.name">
      <div class="modal__header-content content">
        <h2 class="content__name" v-html="university.name"/>
        <a :href="university.site"><img src="../assets/akar-icons_link-chain.svg">{{ site_url }}</a>
        <div class="content__address"><span>Адрес:</span> {{university.city}}, {{university.address}} </div>
      </div>
    </div>
      <div class="modal__description">
        <h3>Описание:</h3>
        <div class="modal__description-text" v-html="university.description"/>
        <h3>Специальности вуза</h3>
        <div class="modal__description-list" v-if="specializations.length > 0">
        <a  v-for="spec in specializations" :key="spec.id" :href="spec.site"> {{spec.speciality.code}} {{spec.speciality.name}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {baseURL} from "@/services/api";
import {getSpecializationsForUniversity} from "@/services/api";

export default {
  name: "UniversityModal",
  props: ["university", "openModal"],
  data() {
    return {
      baseURL,
      specializations: []
    }
  },
  computed: {
    site_url() {
      let site = new URL(this.university.site)
      return site.hostname
    }
  },
  methods: {
    getSpecializations() {
      getSpecializationsForUniversity(this.university.id).then((res) => {
        this.specializations = res.data
      }).catch(err => console.log(err))
    },
    closeModal() {
      this.$emit("update:openModal", false)
    }
  },
  watch: {
    university(newVal) {
      if(newVal!==null) {
        this.getSpecializations()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: flex;

  &__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    width: 50%;
    max-height: 85vh;
    overflow-y: auto;

    @media (max-width: 700px) {
      width: 80vw;
    }
  }

  &__header {
    display: flex;
    width: 100%;

    img {
      width: 50%;
      height: 15vw;
      object-fit: cover;
      border-radius: 12px 0 0 0;
    }
    .content {
      display: flex;
      flex-direction: column;
      padding: 20px;
      a {
        text-decoration: none;
        color: black;
        font-weight: 500;
        font-size: 16px;
        display: flex;
        padding-right: 10px;
        line-height: 19px;
        margin-bottom: 15px;
        img {
          width: 15px;
          height: 14px;
          margin-left: 10px;
        }
      }

      &__address {
        color: #696969;
        font-size: 13px;
        span {
          font-weight: 500;
          color: black;
        }
      }
    }
    @media (max-width: 900px) {
      flex-direction: column;
      img {
        width: 100%;
        border-radius: 12px 12px 0 0;
      }
    }
    @media (max-width: 700px) {
      img {
        height: 60vw;
      }
    }
  }
  &__description {
    padding: 10px 20px;
    h3 {
      padding-top: 20px;
    }
    &-list {
      display: flex;
      overflow-x: scroll;
      overflow-y: hidden;
      width: calc(50vw - 40px);
      @media (max-width: 700px) {
        width: calc(80vw - 40px);
      }

      &::-webkit-scrollbar {
        color: black;
      }
      &::-webkit-scrollbar-thumb {
        border: 5px solid transparent;
        border-radius: 100px;
        background-color: #dddddd;
        background-clip: content-box;
      }
      a {
          text-transform: uppercase;
          font-weight: 500;
          font-size: 14px;
          line-height: 17px;
          text-align: center;
          color: black;
          margin-top: 13px;
          padding: 0 10px;
      }
    }
  }
}
</style>