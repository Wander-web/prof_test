<template>
  <table class="table">
    <thead>
    <tr>
      <th>Категория</th>
      <th>Ваше значение</th>
      <th>Цель</th>
      <th>Комментарий</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(value, index) in values" :key="index">
      <td class="label">{{labels[index]}}</td>
      <td class="value" :class="{'bad': value < modelValues[index]}">{{ value }}</td>
      <td class="modelValue">{{ modelValues[index] }}</td>
      <td class="comment">{{ getComment(index)}}</td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ResultsTable",
  props: ["labels", "values", "modelValues"],
  methods: {
    getComment(index) {
      return this.values[index] < this.modelValues[index]? "низкий уровень" : ''
    }
  }
}
</script>

<style lang="scss" scoped>
.table {
  width: 100%;
  border: none;
  margin-bottom: 20px;

  thead {
    th {
      font-weight: bold;
      text-align: left;
      border: none;
      padding: 10px 15px;
      background: #aecbfc;
      font-size: 14px;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;

      @media (max-width: 700px) {
        font-size: 12px;
      }

      @media (max-width: 445px) {
        padding: 5px 7px;
      }

      @media (max-width: 378px) {
        font-size: 10px;
      }

      &:first-child {
        border-left: none;
        border-radius: 20px 0 0 0;
      }

      &:first-child, .table tr td:first-child {
        border-left: 1px solid #ddd;
      }

      &:last-child, .table tr td:last-child {
        border-right: 1px solid #ddd;
      }

      &:last-child {
        border-right: none;
        border-radius: 0 20px 0 0;
      }
    }
  }

  tbody {
    td {
      text-align: left;
      border-left: 1px solid #ddd;
      border-right: 1px solid #ddd;
      padding: 10px 15px;
      font-size: 14px;
      vertical-align: top;

      @media (max-width: 700px) {
        font-size: 12px;
      }

      @media (max-width: 445px) {
        padding: 5px 7px;
      }
      @media (max-width: 378px) {
        font-size: 10px;
      }

      &.label {
        font-weight: 500;
      }

      &.value {
        font-weight: 500;
      }

      &.bad {
        color: red;
      }

      &:first-child {
        border-left: none;
      }

      &:last-child {
        border-right: none;
      }
    }
    tr:last-child td{
      border-bottom: 1px solid #ddd;

      &:first-child {
        border-radius: 0 0 0 20px;
      }

      &:last-child {
        border-radius: 0 0 20px 0;
      }
    }
  }

}
</style>