<template>
  <n-grid cols="2 s:2 m:2 l:3 xl:3 2xl:3" responsive="screen">
    <n-grid-item>
      <n-form :label-width="80" :model="formValue" :rules="rules" ref="formRef">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="formValue.name" placeholder="请输入名称" />
        </n-form-item>

        <n-form-item label="编号" path="no">
          <n-input placeholder="请输入编号" v-model:value="formValue.no" />
        </n-form-item>

        <!-- <n-form-item label="联系电话" path="mobile">
          <n-input placeholder="请输入联系电话" v-model:value="formValue.mobile" />
        </n-form-item> -->

        <n-form-item label="联系地址" path="address">
          <n-input v-model:value="formValue.address" type="textarea" placeholder="请输入联系地址" />
        </n-form-item>

        <n-form-item label="狀態" path="status">
          <n-switch
            size="large"
            v-model:value="formValue.status"
            @update:value="systemOpenChange"
          />
        </n-form-item>

        <div>
          <n-space>
            <n-button type="primary" @click="formSubmit">更新基本信息</n-button>
          </n-space>
        </div>
      </n-form>
    </n-grid-item>
  </n-grid>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { useDialog, useMessage } from 'naive-ui';
  import { useUserStore } from '@/store/modules/user';
  const userStore = useUserStore();
  const userInfo = userStore.getUserInfo || {};
  console.log(userInfo);

  const rules = {
    name: {
      required: true,
      message: '请输入名称',
      trigger: 'blur',
    },
    no: {
      required: true,
      message: '请输入编号',
      trigger: 'blur',
    },
    address: {
      required: true,
      message: '请输入联系地址',
      trigger: 'blur',
    },
  };

  export default defineComponent({
    setup() {
      const formRef: any = ref(null);
      const message = useMessage();
      const dialog = useDialog();

      const state = reactive({
        formValue: {
          name: '',
          no: '',
          address: '',
          status: false,
        },
      });

      // 當 userInfo 有資料時，將其複製到 formValue 中
      if (userInfo) {
        state.formValue.name = userInfo.name || '';
        state.formValue.no = userInfo.no || '';
        state.formValue.address = userInfo.address || '';
        state.formValue.status = userInfo.status || true;
      }

      function systemOpenChange(value) {
        if (!value) {
          dialog.warning({
            title: '提示',
            content: '您确定要关闭會員權限吗？该操作立马生效，请慎重操作！',
            positiveText: '确定',
            negativeText: '取消',
            onPositiveClick: () => {
              message.success('操作成功');
              state.formValue.status = false;
            },
            onNegativeClick: () => {
              state.formValue.status = true;
            },
          });
        }
      }

      function formSubmit() {
        formRef.value.validate((errors) => {
          if (!errors) {
            message.success('送出成功');
          } else {
            message.error('送出失败，请填写完整信息');
          }
        });
      }

      function resetForm() {
        formRef.value.restoreValidation();
      }

      return {
        formRef,
        ...toRefs(state),
        rules,
        formSubmit,
        resetForm,
        systemOpenChange,
      };
    },
  });
</script>
