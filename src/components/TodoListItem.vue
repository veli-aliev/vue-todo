<template>
  <transition name="fade">
    <li :class="{ selected: item.selected }" class="animated">
      <label>
        <MdCheckbox type="checkbox" v-model="item.selected" @change="$emit('select')">
          {{ item.name }}
        </MdCheckbox>
      </label>

      <div v-if="item.selected" class="delete-icon" @click="$emit('delete')">
        <MdIcon>delete</MdIcon>
      </div>
    </li>
  </transition>
</template>

<script>
  export default {
    name: "TodoListItem",
    props: ['item'],
  }
</script>

<style scoped lang="scss">
  .selected {
    label {
      text-decoration: line-through;
    }
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }

  .delete-icon {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    & i {
      transition: color 0.2s;
    }

    &:hover {
      i {
        color: #ff5252 !important;
      }
    }
  }
</style>