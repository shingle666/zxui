const { createApp, ref, reactive, onMounted, onBeforeUnmount } = Vue;

const app = createApp({
  setup() {
    const isMobileMenuVisible = ref(false);
    const navbarClass = reactive({
      "py-3": true,
      "py-2": false,
      "shadow-sm": true,
      "shadow-md": false,
    });
    let chartInstance = null; // Chart.js instance is not reactive

    const chartData = reactive({
      labels: ["传统开发", "AI组件化"],
      datasets: [
        {
          label: "开发时间",
          data: [100, 30],
          borderColor: "#3b82f6",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          tension: 0.4,
          fill: true,
        },
        {
          label: "代码质量",
          data: [60, 95],
          borderColor: "#06b6d4",
          backgroundColor: "rgba(6, 182, 212, 0.1)",
          tension: 0.4,
          fill: true,
        },
      ],
    });

    const chartOptions = reactive({
      responsive: true,
      plugins: {
        legend: {
          position: "top",
        },
        tooltip: {
          mode: "index",
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 100,
          ticks: {
            callback: function (value) {
              return value + "%";
            },
          },
        },
      },
    });

    const toggleMobileMenu = () => {
      isMobileMenuVisible.value = !isMobileMenuVisible.value;
    };

    const smoothScroll = (event, targetId) => {
      event.preventDefault();
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
        isMobileMenuVisible.value = false;
      }
    };

    // 创建一个ref引用
    const efficiencyChartRef = ref(null);
    
    const initChart = () => {
      // 使用ref引用获取DOM元素
      if (efficiencyChartRef.value) {
        const ctx = efficiencyChartRef.value.getContext("2d");
        chartInstance = new Chart(ctx, {
          type: "line",
          data: chartData,
          options: chartOptions,
        });
      }
    };

    const handleScroll = () => {
      if (window.scrollY > 50) {
        Object.assign(navbarClass, {
          "py-2": true,
          "py-3": false,
          "shadow-md": true,
          "shadow-sm": false,
        });
      } else {
        Object.assign(navbarClass, {
          "py-3": true,
          "py-2": false,
          "shadow-sm": true,
          "shadow-md": false,
        });
      }
    };

    onMounted(() => {
      window.addEventListener("scroll", handleScroll);
      initChart();
    });

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", handleScroll);
      if (chartInstance) {
        chartInstance.destroy();
      }
    });

    return {
      isMobileMenuVisible,
      navbarClass,
      chartData,
      chartOptions,
      toggleMobileMenu,
      smoothScroll,
      // initChart and handleScroll are not directly used in template but called internally
    };
  },
});

app.mount("#app");
