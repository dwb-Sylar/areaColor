<!--
 * @Author: sylar 81855417@qq.com
 * @LastEditors: sylar 81855417@qq.com
 * @Date: 2023-11-17 09:24:20
 * @FilePath: \areaColor\src\views\continent\index.vue
 * @Copyright: Sylar
 * @Description: 
-->
<template>
    <div class="page">
      <div class="eCharts-setting">
        <el-button label="运行" @click="saveOption" type="primary" class="setting-btn">
          生成图表
        </el-button>
        <el-form label-position="top" class="setting-form">
          <el-card header="标题设置">
            <template #header>
              <div class="card-header">
                <span>标题设置</span>
              </div>
            </template>
            <el-form-item :label-width="200">
              <label style="padding-right: 20px">是否显示标题</label>
              <el-radio-group v-model="formState.showTitle" class="ml-4">
                <el-radio :label="0" size="large">隐藏</el-radio>
                <el-radio :label="1" size="large">显示</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-row :gutter="8">
              <el-col :span="10">
                <el-form-item label="一级标题">
                  <el-input v-model="formState.title"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="字号">
                  <el-input v-model="formState.titleFontSize"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="颜色">
                  <el-color-picker v-model="formState.titleColor" />
                </el-form-item>
              </el-col>
            </el-row>
            <div style="display: flex"></div>
            <el-row :gutter="8">
              <el-col :span="10">
                <el-form-item label="二级标题">
                  <el-input v-model="formState.subTitle"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="字号">
                  <el-input v-model="formState.subTitleFontSize"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="颜色">
                  <el-color-picker v-model="formState.subTitleFontColor" />
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
          <el-card>
            <template #header>
              <div class="card-header">
                <span>地区设置</span>
                <el-button class="button" text @click="addArea">添加</el-button>
              </div>
            </template>
            <el-row
              :gutter="8"
              v-for="item in formState.areaList"
              :key="item.name"
              style="display: flex"
            >
              <el-col :span="8">
                <el-form-item label="地区">
                  <el-select v-model="item.name" filterable placeholder="请选择省份">
                    <el-option
                      v-for="area in areaListOption"
                      :key="area.value"
                      :label="area.label"
                      :value="area.value"
                    />
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="6">
                <el-form-item label="别名">
                  <el-input v-model="item.label"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="字体色">
                  <el-color-picker v-model="item.fontColor" show-alpha />
                </el-form-item>
              </el-col>
              <el-col :span="4">
                <el-form-item label="填充色">
                  <el-color-picker v-model="item.color" show-alpha />
                </el-form-item>
              </el-col>
              <el-col :span="2" style="display: flex; align-items: center">
                <el-form-item label=" ">
                  <el-icon
                    style="cursor: pointer"
                    :size="18"
                    @click="deleteArea(item)"
                    ><Delete
                  /></el-icon>
                </el-form-item>
              </el-col>
            </el-row>
          </el-card>
        </el-form>
      </div>
      <div id="eChartsBox"></div>
    </div>
  </template>
  <script setup lang="ts">
  import { ref, reactive, onMounted, inject } from "vue";
  import * as eCharts from "echarts";
  
  import continentGeo from "@/assets/geo/continent.json";

  console.log(continentGeo, "continentGeo");
  const areaListOption = [];
  continentGeo.features.forEach((item) => {
    areaListOption.push({
      label: item.properties.name,
      value: item.properties.name,
    });
  });
  
  const formState = ref({
    showTitle: 1,
    title: "",
    titleFontSize: 24,
    titleColor: "#000",
    subTitle: "",
    subTitleFontSize: 16,
    subTitleFontColor: "#666",
    areaList: [
      {
        name: "Asia",
        label: "亚洲",
        color: "rgba(73, 227, 7, 0.56)",
        fontColor: "#000",
      },
    ],
  });
  const chartOption = ref({});
  let myChart = null;
  
  onMounted(() => {
    myChart = eCharts.init(document.getElementById("eChartsBox"));
    myChart.showLoading();
    eCharts.registerMap("continent", continentGeo as any);
    saveOption()
  });
  const saveOption = () => {
    myChart.showLoading();
  
    let opt = formState.value;
    let seriesData = [];
    opt.areaList.map((item) => {
      seriesData.push({
        name: item.name,
        value: 10,
        itemStyle: {
          color: item.color,
        },
        label: {
          color: item.fontColor,
        },
      });
    });
  
    let option = {
      // 标题配置
      title: {
        show: Boolean(opt.showTitle),
        text: opt.title, // 1级标题
        textStyle: {
          fontSize: opt.titleFontSize || 24,
          color: opt.titleColor || "#000",
        },
        textAlign: "center",
        subtext: opt.subTitle, //2级标题
        subtextStyle: {
          fontSize: opt.subTitleFontSize || 16,
          color: opt.subTitleFontColor || "#666",
        },
        top: 10,
        //2级标题点击跳转地址
        left: "50%", // 标题的位置
      },
      tooltip: {
        trigger: "item",
        showDelay: 0,
        transitionDuration: 0.2,
      },
      visualMap: {
        show: false,
        left: "right",
        // 数据最小值
        min: 0,
        // 数据最大值
        max: 100,
        // 数据值区间颜色配置
        inRange: {
          color: [
            "#9c9ac7",
            "#d16b91",
            "#fe994e",
            "yellow",
            "lightskyblue",
            "#8ccbe3",
          ],
        },
        // 数据区间轴描述
        text: ["High", "Low"],
        // 是否允许拖拽数据轴来显示对应的区间
        calculable: true,
      },
      // 工具栏设置
      toolbox: {
        show: true,
        //orient: 'vertical',
        //工具栏的位置
        left: "left",
        top: "top",
        feature: {
          // dataView: { readOnly: false },
          restore: {},
          saveAsImage: {},
        },
      },
      series: [
        {
          // 数据系列名称，用于tooltip的显示。
          name: opt.title,
          type: "map",
          // 是否允许鼠标的缩放和拖动
          roam: true,
          // 使用 registerMap 注册的地图名称。
          map: "continent",
          label: {
            show: true,
            fontSize: 14,
            formatter(e) {
              let showLabel = "";
              console.log(opt.areaList,255)
              opt.areaList.map((item) => {
                if (item.name == e.name) {
                  showLabel = item.label||item.name;
                }
              });
              return showLabel;
            },
          },
          emphasis: {
            label: {
              show: true,
            },
          },
          // 数据集， name：国家名字，value:数值
          data: seriesData
        },
      ],
    };
  
    chartOption.value = option as any;
    chartRender();
  };
  const addArea = () => {
    formState.value.areaList.push({
      name: "",
      label: "",
      color: "",
      fontColor: "#000",
    });
  };
  const deleteArea = (item) => {
    formState.value.areaList = formState.value.areaList.filter((i) => i !== item);
  };
  const chartRender = () => {
    myChart.setOption(chartOption.value);
    myChart.hideLoading();
  };
  </script>
  <style lang="scss" scoped>
  .eCharts-setting {
    width: 450px;
    border: 1px solid #ccc;
    display: flex;
    padding: 1rem;
    flex-direction: column;
  }
  .setting-btn{
    margin-bottom: 10px;
  }
  .setting-form{
    flex:1;
    overflow: auto;
  }
  #eChartsBox {
    flex: 1;
    border: 1px solid red;
  }
  .card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    color: var(--el-color-primary);
  }
  </style>
  