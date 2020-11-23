<template>
    <div>
        <!-- 云标签组件 -->
        <div id="calendar">
            <!-- 标题 -->
            <div class="title">
                <div class="arrow" 
                @click="changeMonth('pre')"
                > ❮ </div>
                <div class="year-month">
                    <span>{{currentYear}}年{{currentMonth}}月</span>
                </div> 
                <div class="arrow"
                @click="changeMonth('next')"
                > ❯ </div>
            </div>
            <!-- 星期行 -->
            <ul class="weekdays">
                <li v-for='(val,key) in weeks' :key="key">
                <span :style='chooseStyle(key)'>
                    {{val}}
                </span>
    
                </li>
    
            </ul>
            <!-- 日期 -->
            <ul class="days">
                <li v-for='(val,key) in days' :key="key">
                    <span 
                    :class='chooseClass(val.day)'
                    >
                    {{val.day.getDate()}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            currentDay: 1,
            currentMonth: 1,
            currentYear: 1970,
            currentWeek: 1,
            weeks: ["一", "二", "三", "四", "五", "六", "日"],
            days: [] 
        }
    },
    created(){
        this.init();
    },
    methods: {
        init(data) {
        let day;
    
        if (data) {
            day = new Date(data);
        } else {
            let now = new Date();
            day = new Date(this.formDate(now.getFullYear(), now.getMonth() + 1, 1));
        }
        this.currentDay = day.getDate();
        this.currentYear = day.getFullYear();
        this.currentMonth = day.getMonth() + 1;
        this.currentWeek = day.getDay();
        if (!this.currentWeek) {
            this.currentWeek = 7;
        }
        this.days.length = 0;
        let str = this.formDate(
            this.currentYear,
            this.currentMonth,
            this.currentDay
        );
    
        for (let i = 2 - this.currentWeek ; i < 37 - this.currentWeek; i++) {
            let d = new Date(str);
            d.setDate(i);
            this.days.push({
            day: d
            });
        }
        // //获取上月末至本月第一天的日期
        //   for (let i = this.currentWeek - 1; i >= 0; i--) {
        //     let d = new Date(str);
        //     d.setDate(d.getDate() - i);
        //     this.days.push({
        //       day: d
        //     });
        //   }
        // //获取剩余的日期
        //   for (let i = 1; i <= 35 - this.currentWeek; i++) {
        //     let d = new Date(str);
        //     d.setDate(d.getDate() + i);
        //     this.days.push({
        //       day: d
        //     });
        //   }
        },
        //其他月加class名'other'，今天加class名'active'
        chooseClass(day) {
        if (day.getMonth() + 1 != this.currentMonth) return "other";
    
        let a = new Date() - day;
        if (a > 0 && a < 86400000) return "active";
        },
        //改变周六日显示颜色
        chooseStyle(key) {
        if (key === 5 || key === 6) return "color:#f1aaab";
        },
        //切换月份
        changeMonth(a) {
        let d = new Date(this.formDate(this.currentYear, this.currentMonth, 1));
    
        // setDate(0); 上月最后一天
        // setDate(-1); 上月倒数第二天
        // setDate(n) 参数n为 上月最后一天的前后n天
        a === "pre" ? d.setDate(0) : d.setDate(35);
    
        this.init(this.formDate(d.getFullYear(), d.getMonth() + 1, 1));
        },
        //返回字符串个格式的日期
        formDate(year, month, day) {
        return year + "-" + month + "-" + day;
        }
    },
    mounted(){
        
        
    },
}
</script>

<style  scoped>
    ul {
        list-style-type: none;
    }
    
    #calendar {
        width: 100%;
        height: auto;
        margin: 0 auto;
        border-radius: 2px;
        box-shadow: 0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14),
        0 1px 3px 0 rgba(0, 0, 0, 0.12);
    }
    
    .title {
        font-size: 20px;
        letter-spacing: 3px;
        display: flex;
        justify-content: space-between;
        background-color: #ed8079;
        color: #ffffff;
    }
    
    .title .arrow {
        padding: 20px;
        cursor: pointer;
    }
    
    .year-month {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
    }
    
    .weekdays {
        margin: 0;
        padding: 10px 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
    .weekdays li {
        display: inline-block;
        width: 13.6%;
        text-align: center;
    }
    
    .days {
        padding: 0;
        background: #ffffff;
        margin: 0;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
    }
    
    .days li {
        display: inline-block;
        width: 14.2%;
        text-align: center;
        padding-bottom: 8px;
        padding-top: 8px;
    }
    
    .days li .active {
        padding: 4px 10px;
        border-radius: 50%;
        background: #ed8079;
        color: #fff;
    }
    
    .days li .other {
        padding: 5px;
        color: gainsboro;
    }
    
    .days li:hover {
        background: #e1e1e1;
    }
</style>