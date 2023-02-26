<template>
  <div class="study"></div>
</template>

<script setup>
var a = "background: #009688 ; color: #fff";

console.log("%c=====================原生JS内容start=======================", a);
let str = "a//to-ssa/asd-11";
// (old, new)
let res = str.replaceAll("/", "-");
console.log(res);

// (new, old): 在已有的子节点前插入一个新的子节点
/**
 * parentNode.insertBefore(newNode, referenceNode)
 * @params {新插入节点的父节点} parentNode
 * 在参考节点之前插入一个拥有指定父节点的子节点
 */

console.log("%c====================原生JS内容end==========================", a);
</script>

<style></style>
