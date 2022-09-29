<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-back-button></ion-back-button>
                </ion-buttons>
                <ion-title>服务编辑</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div style="height: 100%;width: 100%;">
                <van-form @submit="onSubmit">
                    <van-cell-group>
                        <van-field v-model="ConfigName" name="ConfigName" label="服务名" placeholder="服务名"
                            :rules="[{ required: true, message: '请填写服务名' }]" />
                        <van-field v-model="ServerAddress" name="ServerAddress" label="服务地址" placeholder="服务地址"
                            :rules="[{ required: true, message: '请填写服务地址' }]" />
                    </van-cell-group>
                    <van-cell-group style="margin-top: 12px;">
                        <van-cell center title="默认服务">
                            <template #right-icon>
                                <van-switch v-model="IsShow" size="24" />
                            </template>
                        </van-cell>
                    </van-cell-group>
                    <div style="margin: 16px;margin-top: 20px;">
                        <van-button round block type="primary" native-type="submit">
                            提交
                        </van-button>
                        <van-button style="margin-top:20px;" @click="del" round block type="default">
                            删除
                        </van-button>
                    </div>
                </van-form>
            </div>
        </ion-content>
    </ion-page>
</template>
    
<script>
import { defineComponent, ref } from 'vue';
import { Toast, Dialog, Notify } from 'vant';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/vue';
export default defineComponent({
    name: 'AddServicePage',
    components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage, IonButtons, IonBackButton },
    setup() {
        const router = useRouter();

        const route = useRoute();

        const store = useStore();

        const Id = ref(route.query.Id ?? 0);

        const ConfigName = ref('');
        const ServerAddress = ref('');
        const IsShow = ref(true);

        const getServiceDetail = async (DetailId) => {
            await store.dispatch('getServiceById', DetailId > 0 ? DetailId : -1).then((resolve) => {
                const data = resolve;
                ConfigName.value = data.ConfigName;
                ServerAddress.value = data.ServerAddress;
                IsShow.value = data.IsShow > 0 ? true : false;
            }).catch((reject) => {
                console.log('查询服务失败：' + reject);
                Toast.fail('查询服务失败：' + reject);
            });
        };
        getServiceDetail(Id.value);

        const selectService = async (sId) => {
            await store.dispatch('getServiceList', {})
                .then((resolve) => {
                    var listData = resolve;
                    console.log(JSON.stringify(listData));
                    for (var i = 0; i < listData.length; i++) {
                        var item = listData[i];
                        if (item.Id == sId) {
                            store.dispatch('chosenService', {
                                Id: item.Id,
                                IsShow: 1
                            });
                            store.commit('setBaseUrl',item.ServerAddress);
                        } else {
                            store.dispatch('chosenService', {
                                Id: item.Id,
                                IsShow: 0
                            });
                        }
                    }
                });
        }

        const onSubmit = () => {
            if (Id.value > 0) {
                store.dispatch('updateService', {
                    Id: Id.value,
                    ConfigName: ConfigName.value,
                    ServerAddress: ServerAddress.value,
                    IsShow: IsShow.value ? 1 : 0
                }).then((resolve) => {
                    console.log('update=> ', JSON.stringify(resolve));
                    if (resolve.rowsAffected > 0) {
                        if (IsShow.value) {
                            console.log('update=> ', IsShow.value);
                            selectService(Id.value);
                        }
                        Notify({ type: 'success', message: '保存成功', position: 'bottom' });
                        router.back();
                    }
                }).catch((reject) => {
                    Toast.fail('保存失败：' + reject);
                });
            } else {
                store.dispatch('addService', {
                    ConfigName: ConfigName.value,
                    ServerAddress: ServerAddress.value,
                    IsShow: IsShow.value ? 1 : 0
                }).then((resolve) => {
                    console.log('add=> ', JSON.stringify(resolve));
                    if (resolve.rowsAffected > 0) {
                        console.log(JSON.stringify(resolve));
                        if (IsShow.value) {
                            console.log('add=> ', IsShow.value);
                            selectService(resolve.insertId);
                        }
                        Notify({ type: 'success', message: '添加成功', position: 'bottom' });
                        router.back();
                    }
                }).catch((reject) => {
                    Toast.fail('添加失败：' + reject);
                });
            }
        };
        const del = () => {
            if (Id.value == 0) {
                Toast('数据未添加!');
                return;
            }
            Dialog.confirm({
                title: '确定删除吗？',
            }).then(() => {
                store.dispatch('delService', Id.value).then((resolve, reject) => {
                    if (resolve.rowsAffected > 0) {
                        Notify({ type: 'success', message: '已删除', position: 'bottom' });
                        router.back();
                    } else {
                        Toast.fail('删除失败：' + reject);
                    }
                });
            }).catch(() => {
                // on cancel
            });
        }

        return {
            ConfigName,
            ServerAddress,
            onSubmit,
            IsShow,
            del
        };
    },
});
</script>