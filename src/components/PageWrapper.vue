<template>
    <div class="base-padding">
        <slot></slot>
    </div>
</template>
<style lang="scss">
.base-padding{
    padding: 30px;
    width: 80%;
    margin-top: 100px;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
    background-color: #ffffff;
    border-radius: 8px;
}
</style>