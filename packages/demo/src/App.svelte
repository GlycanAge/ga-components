<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import '../../../dist/arthritis.wc.js';
  import '../../../dist/colitis.wc.js';
  import '../../../dist/crohn.wc.js';
  import '../../../dist/lupus.wc.js';
  import '../../../dist/diabetes.wc.js';
  import '../../../dist/myocardial.wc.js';
  import '../../../dist/menopause.wc.js';
  import '../../../dist/dyslipidemia.wc.js';
  import '../../../dist/atherosclerosis.wc.js';
  import '../../../dist/coronary.wc.js';
  import '../../../dist/copd.wc.js';
  import '../../../dist/hypertension.wc.js';
  import '../../../dist/hypertension-risk.wc.js';
  import '../../../dist/pre-hypertension.wc.js';
  import '../../../dist/chronic.wc.js';
  import '../../../dist/colorectal.wc.js';
  import '../../../dist/endometrial.wc.js';
  import '../../../dist/ovarian.wc.js';
  import '../../../dist/age-graph.wc.js';
  import '../../../dist/index-graph.wc.js';
  import '../../../dist/median-graph.wc.js';
  import '../../../dist/index-graph-japanese.wc.js';
  import '../../../dist/median-graph-japanese.wc.js';
  import '../../../dist/results-overview.wc.js';
  import '../../../dist/results-overview-custom.wc.js';
  import '../../../dist/results-overview-custom-clinical.wc.js';
  import '../../../dist/single-overview.wc.js';
  import '../../../dist/single-overview-three.wc.js';
  import '../../../dist/main-result.wc.js';
  import '../../../dist/main-result-custom.wc.js';
  import '../../../dist/main-result-custom-clinical.wc.js';
  import '../../../dist/insights-overview.wc.js';
  import '../../../dist/insights-overview-latest.wc.js';
  import '../../../dist/arrow-graph.wc.js';
  import '../../../dist/arrow-graph-three.wc.js';
  import '../../../dist/overlap-title.wc.js';
  import '../../../dist/overlap-title-three.wc.js';
  import '../../../dist/scatter-plot.wc.js';
  import '../../../dist/scatter-plot-custom.wc.js';
  import '../../../dist/scatter-plot-custom-clinical.wc.js';
  import '../../../dist/results-overview-clp.wc.js';
  import '../../../dist/results-overview-three.wc.js';
  import '../../../dist/results-overview-three-clp-ch.wc.js';
  import '../../../dist/insights-overview-clp.wc.js';
  import '../../../dist/insights-overview-clp-ch.wc.js';
  import '../../../dist/insights-overview-three.wc.js';
  import '../../../dist/insights-overview-three-clp.wc.js';
  import '../../../dist/insights-overview-three-clp-ch.wc.js';
  import '../../../dist/insights-overview-custom.wc.js';
  import '../../../dist/insights-overview-custom-clinical.wc.js';
  import '../../../dist/insights-overview-three-client.wc.js';
  import '../../../dist/main-result-clp.wc.js';
  import '../../../dist/main-result-three-client.wc.js';
  import '../../../dist/single-overview-clp.wc.js';
  import '../../../dist/single-overview-clp-new.wc.js';
  import '../../../dist/single-overview-clp-new-ch.wc.js';
  import '../../../dist/single-overview-custom.wc.js';
  import '../../../dist/single-overview-custom-clinical.wc.js';
  import '../../../dist/arrow-graph-clp.wc.js';
  import '../../../dist/arrow-graph-clp-ch.wc.js';
  import '../../../dist/overlap-title-clp.wc.js';
  import '../../../dist/overlap-title-clp-ch.wc.js';
  import '../../../dist/scatter-plot-clp.wc.js';
  import '../../../dist/scatter-plot-clp-ch.wc.js';
  import '../../../dist/over-time.wc.js';
  import '../../../dist/over-time-clp.wc.js';
  import '../../../dist/over-time-indexes.wc.js';
  import '../../../dist/over-time-indexes-clp-ch.wc.js';
  import '../../../dist/main-result-three.wc.js';
  import '../../../dist/action-steps-three.wc.js';
  import '../../../dist/action-steps-three-clp.wc.js';
  import '../../../dist/action-steps-three-clp-ch.wc.js';
  import '../../../dist/action-steps-three-client.wc.js';
  import { MockService } from './mock-service';

  type ComponentEntry = { id: string; name: string };
  type Category = { name: string; components: ComponentEntry[] };
  type RouteConfig = { label: string; categories: Category[] };

  const REPORT_ID = '1K4GyKDgsB9ATQflwio7';

  let activeRoute = 'b2b';
  let selectedComponent: string | null = null;

  const routes: Record<string, RouteConfig> = {
    'b2b': {
      label: 'B2B',
      categories: [
        {
          name: 'Graphs',
          components: [
            { id: 'age-graph', name: 'Age Graph' },
            { id: 'index-graph', name: 'Index Graph' },
            { id: 'median-graph', name: 'Median Graph' },
            { id: 'index-graph-japanese', name: 'Index Graph (Japanese)' },
          ]
        },
        {
          name: 'Cardiovascular',
          components: [
            { id: 'chronic', name: 'Chronic' },
            { id: 'hypertension-risk', name: 'Hypertension Risk' },
            { id: 'pre-hypertension', name: 'Pre-Hypertension' },
            { id: 'hypertension', name: 'Hypertension' },
            { id: 'myocardial', name: 'Myocardial' },
            { id: 'atherosclerosis', name: 'Atherosclerosis' },
            { id: 'coronary', name: 'Coronary' },
            { id: 'dyslipidemia', name: 'Dyslipidemia' },
            { id: 'copd', name: 'COPD' },
          ]
        },
        {
          name: 'Autoimmune',
          components: [
            { id: 'arthritis', name: 'Arthritis' },
            { id: 'colitis', name: 'Colitis' },
            { id: 'crohn', name: 'Crohn' },
            { id: 'lupus', name: 'Lupus (SLE)' },
          ]
        },
        {
          name: 'Metabolic',
          components: [
            { id: 'diabetes', name: 'Diabetes' },
          ]
        },
        {
          name: 'Cancer Risk',
          components: [
            { id: 'colorectal', name: 'Colorectal' },
            { id: 'endometrial', name: 'Endometrial' },
            { id: 'ovarian', name: 'Ovarian' },
          ]
        },
        {
          name: "Women's Health",
          components: [
            { id: 'menopause', name: 'Menopause' },
          ]
        },
        {
          name: 'Main Results',
          components: [
            { id: 'main-result', name: 'Main Result' },
            { id: 'main-result-three', name: 'Main Result Three' },
            { id: 'main-result-three-client', name: 'Main Result Three Client' },
            { id: 'main-result-custom', name: 'Main Result Custom' },
            { id: 'main-result-custom-clinical', name: 'Main Result Custom Clinical' },
          ]
        },
        {
          name: 'Results Overview',
          components: [
            { id: 'results-overview', name: 'Results Overview' },
            { id: 'results-overview-three', name: 'Results Overview Three' },
            { id: 'results-overview-three-clp-ch', name: 'Results Overview Three CLP CH' },
            { id: 'results-overview-custom', name: 'Results Overview Custom' },
            { id: 'results-overview-custom-clinical', name: 'Results Overview Custom Clinical' },
          ]
        },
        {
          name: 'Single Overview',
          components: [
            { id: 'single-overview', name: 'Single Overview' },
            { id: 'single-overview-three', name: 'Single Overview Three' },
            { id: 'single-overview-custom', name: 'Single Overview Custom' },
            { id: 'single-overview-custom-clinical', name: 'Single Overview Custom Clinical' },
          ]
        },
        {
          name: 'Insights Overview',
          components: [
            { id: 'insights-overview', name: 'Insights Overview' },
            { id: 'insights-overview-latest', name: 'Insights Overview Latest' },
            { id: 'insights-overview-three', name: 'Insights Overview Three' },
            { id: 'insights-overview-three-clp', name: 'Insights Overview Three CLP' },
            { id: 'insights-overview-three-clp-ch', name: 'Insights Overview Three CLP CH' },
            { id: 'insights-overview-three-client', name: 'Insights Overview Three Client' },
            { id: 'insights-overview-custom', name: 'Insights Overview Custom' },
            { id: 'insights-overview-custom-clinical', name: 'Insights Overview Custom Clinical' },
          ]
        },
        {
          name: 'Scatter Plots',
          components: [
            { id: 'scatter-plot', name: 'Scatter Plot' },
            { id: 'scatter-plot-custom', name: 'Scatter Plot Custom' },
            { id: 'scatter-plot-custom-clinical', name: 'Scatter Plot Custom Clinical' },
          ]
        },
        {
          name: 'Overlap Titles',
          components: [
            { id: 'overlap-title', name: 'Overlap Title' },
            { id: 'overlap-title-three', name: 'Overlap Title Three' },
          ]
        },
        {
          name: 'Arrow Graphs',
          components: [
            { id: 'arrow-graph', name: 'Arrow Graph' },
            { id: 'arrow-graph-three', name: 'Arrow Graph Three' },
          ]
        },
        {
          name: 'Over Time',
          components: [
            { id: 'over-time', name: 'Over Time' },
            { id: 'over-time-indexes-clp-ch', name: 'Over Time Indexes CLP CH' },
          ]
        },
        {
          name: 'Action Steps',
          components: [
            { id: 'action-steps-three', name: 'Action Steps Three' },
            { id: 'action-steps-three-clp', name: 'Action Steps Three CLP' },
            { id: 'action-steps-three-clp-ch', name: 'Action Steps Three CLP CH' },
            { id: 'action-steps-three-client', name: 'Action Steps Three Client' },
          ]
        },
      ]
    },
    'b2b2c': {
      label: 'B2B2C',
      categories: [
        {
          name: 'Components',
          components: [
            { id: 'main-result', name: 'Main Result' },
            { id: 'results-overview', name: 'Results Overview' },
            { id: 'single-overview', name: 'Single Overview' },
          ]
        },
      ]
    },
    'b2c': {
      label: 'B2C',
      categories: [
        {
          name: 'Components',
          components: [
            { id: 'main-result', name: 'Main Result' },
            { id: 'results-overview', name: 'Results Overview' },
            { id: 'single-overview', name: 'Single Overview' },
          ]
        },
      ]
    },
    'clp': {
      label: 'CLP',
      categories: [
        {
          name: 'Main Results',
          components: [
            { id: 'main-result-clp', name: 'Main Result CLP' },
          ]
        },
        {
          name: 'Results Overview',
          components: [
            { id: 'results-overview-clp', name: 'Results Overview CLP' },
          ]
        },
        {
          name: 'Single Overview',
          components: [
            { id: 'single-overview-clp', name: 'Single Overview CLP' },
            { id: 'single-overview-clp-new', name: 'Single Overview CLP New' },
            { id: 'single-overview-clp-new-ch', name: 'Single Overview CLP New CH' },
          ]
        },
        {
          name: 'Insights Overview',
          components: [
            { id: 'insights-overview-clp', name: 'Insights Overview CLP' },
            { id: 'insights-overview-clp-ch', name: 'Insights Overview CLP CH' },
          ]
        },
        {
          name: 'Scatter Plots',
          components: [
            { id: 'scatter-plot-clp', name: 'Scatter Plot CLP' },
            { id: 'scatter-plot-clp-ch', name: 'Scatter Plot CLP CH' },
          ]
        },
        {
          name: 'Overlap Titles',
          components: [
            { id: 'overlap-title-clp', name: 'Overlap Title CLP' },
            { id: 'overlap-title-clp-ch', name: 'Overlap Title CLP CH' },
          ]
        },
        {
          name: 'Arrow Graphs',
          components: [
            { id: 'arrow-graph-clp', name: 'Arrow Graph CLP' },
            { id: 'arrow-graph-clp-ch', name: 'Arrow Graph CLP CH' },
          ]
        },
        {
          name: 'Over Time',
          components: [
            { id: 'over-time-clp', name: 'Over Time CLP' },
          ]
        },
      ]
    },
  };

  const routeOrder = ['b2b', 'b2b2c', 'b2c', 'clp'];

  $: currentRoute = routes[activeRoute];

  // ── Hash-based routing ──

  function parseHash(): { route: string; component: string | null } {
    const hash = window.location.hash.replace(/^#\/?/, '');
    const parts = hash.split('/').filter(Boolean);
    const route = parts[0] && routes[parts[0]] ? parts[0] : 'b2b';
    const component = parts.length > 1 ? parts.slice(1).join('/') : null;
    return { route, component };
  }

  function syncFromHash() {
    const { route, component } = parseHash();
    activeRoute = route;
    selectedComponent = component;
  }

  function navigate(route: string, component: string | null = null) {
    const hash = component ? `#/${route}/${component}` : `#/${route}`;
    window.location.hash = hash;
  }

  function handleHashChange() {
    syncFromHash();
  }

  onMount(() => {
    window.GaReportService = new MockService();
    syncFromHash();
    window.addEventListener('hashchange', handleHashChange);
  });

  onDestroy(() => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('hashchange', handleHashChange);
    }
  });
</script>

<!-- ========== LAYOUT ========== -->
<div class="layout">

  <!-- SIDEBAR -->
  <aside class="sidebar">
    <a class="logo" href="#/" on:click|preventDefault={() => navigate('b2b')}>
      <svg width="94" height="19" viewBox="0 0 94 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.83 1.598C9.558 1.598 10.962 3.29 11.952 5.576H11.988L11.88 1.22C11.466 1.562 11.178 1.742 10.692 1.742C10.098 1.742 9.162 1.22 7.416 1.22C3.636 1.22 0.432 3.83 0.432 7.772C0.432 11.678 3.15 14.18 7.11 14.18C8.712 14.18 10.278 13.478 11.196 12.488L12.78 14.18H12.816V10.238C12.816 9.05 12.996 8.672 13.788 8.114V8.078H8.172V8.114C8.964 8.672 9.144 9.05 9.144 10.238V11.354C9.144 12.884 8.424 13.784 7.146 13.784C5.418 13.784 4.518 11.138 4.518 7.772C4.518 4.046 5.688 1.598 7.83 1.598ZM18.619 0.518H13.957V0.553999C14.803 0.985999 15.019 1.274 15.019 2.516V12.038C15.019 13.226 14.983 13.424 14.227 13.964V14H19.411V13.964C18.655 13.424 18.619 13.226 18.619 12.038V0.518ZM24.2654 15.476C23.9054 16.286 23.4734 16.664 22.7894 16.664C22.1954 16.664 21.7454 16.232 21.7454 15.656C21.7454 15.242 21.9074 14.99 22.1954 14.81C22.0334 14.756 21.9074 14.738 21.7094 14.738C20.8094 14.738 20.0894 15.332 20.0894 16.358C20.0894 17.474 20.9174 18.104 21.9974 18.104C23.1314 18.104 23.8874 17.42 24.4814 15.944L28.1534 7.052C28.6214 5.936 28.9274 5.594 29.5394 5.09V5.054H26.7854V5.09C27.3614 5.306 27.7574 5.72 27.7574 6.35C27.7574 6.602 27.7034 6.854 27.5774 7.16L26.1734 10.652L24.3554 6.89C24.1934 6.548 24.1034 6.188 24.1034 5.9C24.1034 5.54 24.2114 5.324 24.5894 5.09V5.054H19.2794V5.09C19.8734 5.666 20.0534 5.918 20.6114 6.998L24.5894 14.756L24.2654 15.476ZM34.3219 5.18C35.1139 5.18 35.5459 5.702 35.5459 6.566C35.5459 7.286 35.2939 7.898 34.6099 7.898C34.5199 7.898 34.3759 7.88 34.2679 7.826C34.3399 8.384 34.9159 8.924 35.9419 8.924C36.8419 8.924 37.7239 8.366 37.7239 7.232C37.7239 5.666 36.2119 4.874 34.2679 4.874C31.2619 4.874 28.9579 6.656 28.9579 9.698C28.9579 12.488 31.1179 14.18 33.6739 14.18C35.6899 14.18 37.3639 13.064 37.9039 11.156L37.7779 11.102C37.2199 12.128 36.3379 12.542 35.4019 12.542C33.7099 12.542 32.6839 11.264 32.6839 8.798C32.6839 6.764 33.1519 5.18 34.3219 5.18ZM48.9261 13.298C48.8001 13.334 48.6561 13.334 48.5481 13.334C47.6301 13.334 47.5401 12.668 47.5401 11.444C47.5401 10.112 47.5761 9.032 47.5761 8.042C47.5761 5.774 46.0101 4.874 42.9141 4.874C40.5741 4.874 38.9541 5.738 38.9541 7.178C38.9541 8.132 39.7821 8.726 40.7721 8.726C41.7261 8.726 42.4821 8.366 42.8961 7.61C42.7701 7.646 42.6441 7.664 42.5361 7.664C41.9781 7.664 41.6541 7.304 41.6541 6.53C41.6541 5.774 42.0861 5.198 42.8241 5.198C43.7421 5.198 44.0121 6.044 44.0121 6.872V8.78L42.6441 9.032C40.4841 9.428 38.5041 9.806 38.5041 11.858C38.5041 13.406 39.7821 14.126 41.1861 14.126C42.7161 14.126 43.7421 13.388 44.0661 12.182C44.0661 12.236 44.0841 12.488 44.1021 12.56C44.2821 13.55 45.0381 14.18 46.6221 14.18C47.5221 14.18 48.4401 13.838 48.9261 13.334V13.298ZM44.0121 9.104V11.102C43.9941 11.984 43.6701 12.794 42.8961 12.794C42.2481 12.794 41.9601 12.182 41.9601 11.318C41.9601 10.184 42.3561 9.482 43.3641 9.266L44.0121 9.104ZM48.7668 5.054V5.09C49.5948 5.612 49.6848 5.792 49.6848 7.052V12.038C49.6848 13.226 49.6488 13.424 48.8928 13.964V14H54.0768V13.964C53.3208 13.424 53.2848 13.226 53.2848 12.038V8.69C53.2848 7.16 53.8248 6.548 54.5988 6.548C55.3188 6.548 55.6608 7.106 55.6608 7.826V12.038C55.6608 13.226 55.6248 13.424 54.8688 13.964V14H60.0528V13.964C59.2968 13.424 59.2608 13.226 59.2608 12.038V7.988C59.2608 6.314 58.4148 4.874 56.3988 4.874C54.8688 4.874 53.7168 5.756 53.2848 7.358V5.054H48.7668ZM65.3158 5.846L67.2238 9.86H63.4798L65.3158 5.846ZM63.4618 13.964C62.7598 13.64 62.4358 13.154 62.4358 12.578C62.4358 12.272 62.5258 11.984 62.6518 11.678L63.2278 10.4H67.4938L68.2138 11.93C68.3938 12.308 68.4838 12.596 68.4838 12.938C68.4838 13.352 68.2678 13.64 67.7458 13.964V14H73.8658V13.964C73.2538 13.514 72.9478 13.082 72.4078 11.984L67.0618 1.22H66.9898L61.9318 11.84C61.4098 12.938 60.9058 13.514 60.2578 13.964V14H63.4618V13.964ZM78.7773 5.162C79.3893 5.162 79.6053 6.026 79.6053 7.826C79.6053 9.644 79.3893 10.49 78.7773 10.49C78.1833 10.49 77.9673 9.644 77.9673 7.826C77.9673 6.026 78.1833 5.162 78.7773 5.162ZM84.3033 14.504C84.3033 12.722 82.8813 11.804 80.7753 11.804H76.6353C76.1493 11.804 75.8973 11.57 75.8973 11.192C75.8973 10.832 76.1673 10.616 76.6173 10.454C77.2293 10.67 77.9313 10.778 78.7773 10.778C81.4953 10.778 83.0253 9.572 83.0253 7.826C83.0253 6.944 82.6113 6.206 81.8373 5.702C82.0533 5.504 82.2873 5.36 82.6293 5.36C83.2953 5.36 83.5833 5.828 83.5833 6.35C83.5833 6.584 83.5113 6.782 83.4033 6.962V6.998C84.1593 6.998 85.0773 6.62 85.0773 5.522C85.0773 4.658 84.4833 4.1 83.4933 4.1C82.5033 4.1 82.0173 4.928 81.6393 5.558C80.9373 5.108 79.9653 4.874 78.7773 4.874C76.0773 4.874 74.5473 6.098 74.5473 7.826C74.5473 8.924 75.1593 9.842 76.3293 10.328C75.1953 10.688 74.2413 11.552 74.2413 12.776C74.2413 13.946 75.0153 14.738 76.1313 15.008C74.6553 15.044 73.9173 15.602 73.9173 16.286C73.9173 17.708 76.2933 18.086 78.4713 18.086C81.4593 18.086 84.3033 17.024 84.3033 14.504ZM78.4713 17.78C76.9413 17.78 75.6633 17.33 75.6633 16.25C75.6633 15.44 76.2573 15.098 77.1213 15.098H80.3433C81.3153 15.098 81.8553 15.404 81.8553 16.16C81.8553 17.258 80.2893 17.78 78.4713 17.78ZM89.5929 4.874C86.9469 4.874 84.7509 6.674 84.7509 9.536C84.7509 12.488 86.9109 14.18 89.5569 14.18C91.6089 14.18 93.2829 13.064 93.8409 11.156L93.7329 11.102C93.1569 12.128 92.2569 12.542 91.2129 12.542C89.5569 12.542 88.3869 11.318 88.3869 9.104H93.9669C93.9669 6.764 92.5629 4.874 89.5929 4.874ZM88.3869 8.744C88.4229 6.62 88.7469 5.18 89.5929 5.18C90.4569 5.18 90.5649 6.674 90.5649 8.744H88.3869Z" fill="#09341F"/>
      </svg>
    </a>

    <nav class="sidebar-nav">
      {#each routeOrder as routeId}
        <button
          class="sidebar-link"
          class:active={activeRoute === routeId}
          on:click={() => navigate(routeId)}
        >
          {routes[routeId].label}
        </button>
      {/each}
    </nav>

    <div class="sidebar-footer">
      <span class="sidebar-badge">Component Demo</span>
    </div>
  </aside>

  <!-- MAIN CONTENT -->
  <main class="content">

    {#if !selectedComponent}
      <!-- CATALOG GRID -->
      <div class="catalog">
        <h1 class="catalog-title">{currentRoute.label} Components</h1>
        {#each currentRoute.categories as category}
          <section class="category">
            <h2 class="category-name">{category.name}</h2>
            <div class="card-grid">
              {#each category.components as comp}
                <button class="card" on:click={() => navigate(activeRoute, comp.id)}>
                  <span class="card-name">{comp.name}</span>
                  <span class="card-arrow">&#8594;</span>
                </button>
              {/each}
            </div>
          </section>
        {/each}
      </div>

    {:else}
      <!-- COMPONENT DETAIL VIEW -->
      <div class="detail">
        <button class="back-btn" on:click={() => navigate(activeRoute)}>&#8592; Back to {currentRoute.label} components</button>
        <div class="detail-body">

          <!-- ==================== B2B ==================== -->
          {#if activeRoute === 'b2b'}

            {#if selectedComponent === 'age-graph'}
              <h2>Age Graph</h2>
              <p class="note">Also used in B2B2C (v1.0, v1.1) and B2C (v1.1)</p>
              <div class="demo-box" style="width: 34rem;">
                <ga-age-graph lang="english"></ga-age-graph>
              </div>

            {:else if selectedComponent === 'index-graph'}
              <h2>Index Graph</h2>
              <div class="demo-box" style="width: 70ch;">
                <ga-index-graph type="shield" lang="english"></ga-index-graph>
              </div>

            {:else if selectedComponent === 'median-graph'}
              <h2>Median Graph</h2>
              <div class="demo-box" style="width: 70ch;">
                <ga-median-graph></ga-median-graph>
              </div>

            {:else if selectedComponent === 'index-graph-japanese'}
              <h2>Index Graph (Japanese)</h2>
              <div class="demo-box" style="width: 70ch;">
                <ga-index-graph-japanese type="youth"></ga-index-graph-japanese>
              </div>

            {:else if selectedComponent === 'chronic'}
              <h2>Chronic</h2>
              <div class="demo-box" style="height: 5rem; width: 25rem;">
                <ga-chronic></ga-chronic>
              </div>

            {:else if selectedComponent === 'hypertension-risk'}
              <h2>Hypertension Risk</h2>
              <div class="demo-section">
                <h3>Default</h3>
                <div class="demo-box" style="width: 630px; height: 49px;">
                  <ga-hypertension-risk report={REPORT_ID}></ga-hypertension-risk>
                </div>
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-hypertension-risk report={REPORT_ID} type="header"></ga-hypertension-risk>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-hypertension-risk style="width:50%;" report={REPORT_ID} type="summary"></ga-hypertension-risk>
                </div>
              </div>

            {:else if selectedComponent === 'pre-hypertension'}
              <h2>Pre-Hypertension</h2>
              <div class="demo-section">
                <h3>Default</h3>
                <div class="demo-box" style="width: 630px; height: 49px;">
                  <ga-pre-hypertension lang="polish" report={REPORT_ID}></ga-pre-hypertension>
                </div>
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-pre-hypertension lang="polish" type="header" report={REPORT_ID}></ga-pre-hypertension>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-pre-hypertension lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-pre-hypertension>
                </div>
              </div>

            {:else if selectedComponent === 'hypertension'}
              <h2>Hypertension</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-hypertension subtype={subtype} report={REPORT_ID}></ga-hypertension>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-hypertension type="header" report={REPORT_ID}></ga-hypertension>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-hypertension style="width:50%;" report={REPORT_ID} type="summary"></ga-hypertension>
                </div>
              </div>

            {:else if selectedComponent === 'myocardial'}
              <h2>Myocardial</h2>
              <p class="note">Different layout for Female/Male</p>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-myocardial lang="polish" subtype={subtype} report={REPORT_ID}></ga-myocardial>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-myocardial lang="polish" type="header" report={REPORT_ID}></ga-myocardial>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-myocardial lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-myocardial>
                </div>
              </div>

            {:else if selectedComponent === 'atherosclerosis'}
              <h2>Atherosclerosis</h2>
              <p class="note">Female only</p>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-atherosclerosis lang="polish" subtype={subtype} report={REPORT_ID}></ga-atherosclerosis>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-atherosclerosis lang="polish" type="header" report={REPORT_ID}></ga-atherosclerosis>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-atherosclerosis lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-atherosclerosis>
                </div>
              </div>

            {:else if selectedComponent === 'coronary'}
              <h2>Coronary</h2>
              <p class="note">Female only</p>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'shield'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-coronary lang="polish" subtype={subtype} report={REPORT_ID}></ga-coronary>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-coronary lang="polish" type="header" report={REPORT_ID}></ga-coronary>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-coronary lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-coronary>
                </div>
              </div>

            {:else if selectedComponent === 'arthritis'}
              <h2>Arthritis</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-arthritis subtype={subtype} report={REPORT_ID}></ga-arthritis>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-arthritis type="header" report={REPORT_ID}></ga-arthritis>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-arthritis style="width:50%;" report={REPORT_ID} type="summary"></ga-arthritis>
                </div>
              </div>

            {:else if selectedComponent === 'colitis'}
              <h2>Colitis</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                <div class="demo-box" style="width: 630px; height: 49px;">
                  <ga-colitis subtype="mature" report={REPORT_ID}></ga-colitis>
                </div>
                {#each ['median', 'youth', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-colitis lang="polish" subtype={subtype} report={REPORT_ID}></ga-colitis>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-colitis lang="polish" type="header" report={REPORT_ID}></ga-colitis>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-colitis lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-colitis>
                </div>
              </div>

            {:else if selectedComponent === 'crohn'}
              <h2>Crohn</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-crohn lang="polish" subtype={subtype} report={REPORT_ID}></ga-crohn>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-crohn lang="polish" type="header" report={REPORT_ID}></ga-crohn>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-crohn lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-crohn>
                </div>
              </div>

            {:else if selectedComponent === 'lupus'}
              <h2>Lupus (SLE)</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['peak18', 'peak22', 'peak23', 'peak26'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-lupus lang="polish" subtype={subtype} report={REPORT_ID}></ga-lupus>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-lupus lang="polish" type="header" report={REPORT_ID}></ga-lupus>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-lupus lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-lupus>
                </div>
              </div>

            {:else if selectedComponent === 'diabetes'}
              <h2>Diabetes</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-diabetes lang="polish" subtype={subtype} report={REPORT_ID}></ga-diabetes>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-diabetes lang="polish" type="header" report={REPORT_ID}></ga-diabetes>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-diabetes lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-diabetes>
                </div>
              </div>

            {:else if selectedComponent === 'dyslipidemia'}
              <h2>Dyslipidemia</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-dyslipidemia lang="polish" subtype={subtype} report={REPORT_ID}></ga-dyslipidemia>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-dyslipidemia lang="polish" type="header" report={REPORT_ID}></ga-dyslipidemia>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-dyslipidemia lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-dyslipidemia>
                </div>
              </div>

            {:else if selectedComponent === 'copd'}
              <h2>COPD</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['median', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-copd lang="polish" subtype={subtype} report={REPORT_ID}></ga-copd>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-copd lang="polish" type="header" report={REPORT_ID}></ga-copd>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-copd lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-copd>
                </div>
              </div>

            {:else if selectedComponent === 'menopause'}
              <h2>Menopause</h2>
              <p class="note">Female only</p>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-menopause lang="polish" subtype={subtype} report={REPORT_ID}></ga-menopause>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-menopause lang="polish" type="header" report={REPORT_ID}></ga-menopause>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-menopause lang="polish" style="width:50%;" report={REPORT_ID} type="summary"></ga-menopause>
                </div>
              </div>

            {:else if selectedComponent === 'colorectal'}
              <h2>Colorectal</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-colorectal subtype={subtype} report={REPORT_ID}></ga-colorectal>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-colorectal type="header" report={REPORT_ID}></ga-colorectal>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-colorectal style="width:50%;" report={REPORT_ID} type="summary"></ga-colorectal>
                </div>
              </div>

            {:else if selectedComponent === 'endometrial'}
              <h2>Endometrial</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-endometrial subtype={subtype} report={REPORT_ID}></ga-endometrial>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-endometrial type="header" report={REPORT_ID}></ga-endometrial>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-endometrial style="width:50%;" report={REPORT_ID} type="summary"></ga-endometrial>
                </div>
              </div>

            {:else if selectedComponent === 'ovarian'}
              <h2>Ovarian</h2>
              <div class="demo-section">
                <h3>Subtypes</h3>
                {#each ['mature', 'median', 'youth', 'lifestyle'] as subtype}
                  <div class="demo-box" style="width: 630px; height: 49px;">
                    <ga-ovarian subtype={subtype} report={REPORT_ID}></ga-ovarian>
                  </div>
                {/each}
                <h3>Header</h3>
                <div class="demo-box" style="width: 240px; height: 49px;">
                  <ga-ovarian type="header" report={REPORT_ID}></ga-ovarian>
                </div>
                <h3>Summary</h3>
                <div class="demo-box" style="width: 520px; height: 928px;">
                  <ga-ovarian style="width:50%;" report={REPORT_ID} type="summary"></ga-ovarian>
                </div>
              </div>

            {:else if selectedComponent === 'main-result'}
              <h2>Main Result</h2>
              <p class="note">Also used in B2B2C and B2C</p>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result lang="chinese"></ga-main-result>
              </div>

            {:else if selectedComponent === 'main-result-three'}
              <h2>Main Result Three</h2>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result-three lang="chinese"></ga-main-result-three>
              </div>

            {:else if selectedComponent === 'main-result-three-client'}
              <h2>Main Result Three Client</h2>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result-three-client lang="english"></ga-main-result-three-client>
              </div>

            {:else if selectedComponent === 'main-result-custom'}
              <h2>Main Result Custom</h2>
              <div class="demo-box" style="width: 265px; height: 64px;">
                <ga-main-result-custom></ga-main-result-custom>
              </div>

            {:else if selectedComponent === 'main-result-custom-clinical'}
              <h2>Main Result Custom Clinical</h2>
              <div class="demo-box" style="width: 265px; height: 64px;">
                <ga-main-result-custom-clinical></ga-main-result-custom-clinical>
              </div>

            {:else if selectedComponent === 'results-overview'}
              <h2>Results Overview</h2>
              <p class="note">Also used in B2B2C and B2C</p>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 588px; width: 550px;">
                {#each ['age', 'shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview type={type} lang="english"></ga-results-overview>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'results-overview-three'}
              <h2>Results Overview Three</h2>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 490px; width: 550px;">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview-three type={type} lang={type === 'shield' ? 'chinese' : 'english'}></ga-results-overview-three>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'results-overview-three-clp-ch'}
              <h2>Results Overview Three CLP CH</h2>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 490px; width: 550px;">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview-three-clp-ch type={type}></ga-results-overview-three-clp-ch>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'results-overview-custom'}
              <h2>Results Overview Custom</h2>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 280px; height: 64px; border-top: 2px solid #09341F33;">
                    <ga-results-overview-custom type={type}></ga-results-overview-custom>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'results-overview-custom-clinical'}
              <h2>Results Overview Custom Clinical</h2>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 280px; height: 64px; border-top: 2px solid #09341F33;">
                    <ga-results-overview-custom-clinical type={type}></ga-results-overview-custom-clinical>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview'}
              <h2>Single Overview</h2>
              <p class="note">Also used in B2B2C and B2C</p>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview type={type} lang="english"></ga-single-overview>
                  </div>
                {/each}
                {#each ['median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview type={type} lang="chinese"></ga-single-overview>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview-three'}
              <h2>Single Overview Three</h2>
              <div class="demo-section">
                <div class="demo-box" style="width: 550px; height: 200px;">
                  <ga-single-overview-three type="shield" lang="chinese"></ga-single-overview-three>
                </div>
                {#each ['youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview-three type={type} lang="english"></ga-single-overview-three>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview-custom'}
              <h2>Single Overview Custom</h2>
              <div class="demo-box" style="width: 320px; height: 100px;">
                <ga-single-overview-custom type="shield"></ga-single-overview-custom>
              </div>

            {:else if selectedComponent === 'single-overview-custom-clinical'}
              <h2>Single Overview Custom Clinical</h2>
              <div class="demo-box" style="width: 320px; height: 100px;">
                <ga-single-overview-custom-clinical type="shield"></ga-single-overview-custom-clinical>
              </div>

            {:else if selectedComponent === 'insights-overview'}
              <h2>Insights Overview</h2>
              <div class="demo-box" style="height: 588px; width: 550px;">
                <ga-insights-overview lang="chinese"></ga-insights-overview>
              </div>

            {:else if selectedComponent === 'insights-overview-latest'}
              <h2>Insights Overview Latest</h2>
              <div class="demo-box" style="height: 588px; width: 550px;">
                <ga-insights-overview-latest lang="english"></ga-insights-overview-latest>
              </div>

            {:else if selectedComponent === 'insights-overview-three'}
              <h2>Insights Overview Three</h2>
              <div class="demo-section">
                <h3>Long variant</h3>
                <div class="demo-box" style="height: 500px; width: 550px;">
                  <ga-insights-overview-three lang="chinese" type="long"></ga-insights-overview-three>
                </div>
                <h3>Short variant</h3>
                <div class="demo-box" style="height: 588px; width: 550px;">
                  <ga-insights-overview-three lang="english" type="short"></ga-insights-overview-three>
                </div>
              </div>

            {:else if selectedComponent === 'insights-overview-three-clp'}
              <h2>Insights Overview Three CLP</h2>
              <div class="demo-section">
                <h3>Long variant</h3>
                <div class="demo-box" style="height: 588px; width: 550px;">
                  <ga-insights-overview-three-clp lang="english" type="long"></ga-insights-overview-three-clp>
                </div>
                <h3>Short variant</h3>
                <div class="demo-box" style="height: 588px; width: 550px;">
                  <ga-insights-overview-three-clp lang="english" type="short"></ga-insights-overview-three-clp>
                </div>
              </div>

            {:else if selectedComponent === 'insights-overview-three-clp-ch'}
              <h2>Insights Overview Three CLP CH</h2>
              <div class="demo-section">
                <h3>Long variant</h3>
                <div class="demo-box" style="height: 588px; width: 550px;">
                  <ga-insights-overview-three-clp-ch lang="english" type="long"></ga-insights-overview-three-clp-ch>
                </div>
                <h3>Short variant</h3>
                <div class="demo-box" style="height: 588px; width: 550px;">
                  <ga-insights-overview-three-clp-ch lang="english" type="short"></ga-insights-overview-three-clp-ch>
                </div>
              </div>

            {:else if selectedComponent === 'insights-overview-three-client'}
              <h2>Insights Overview Three Client</h2>
              <div class="demo-box" style="height: 588px; width: 550px;">
                <ga-insights-overview-three-client lang="english" type="long"></ga-insights-overview-three-client>
              </div>

            {:else if selectedComponent === 'insights-overview-custom'}
              <h2>Insights Overview Custom</h2>
              <div class="demo-box" style="width: 32rem; height: 8rem;">
                <ga-insights-overview-custom></ga-insights-overview-custom>
              </div>

            {:else if selectedComponent === 'insights-overview-custom-clinical'}
              <h2>Insights Overview Custom Clinical</h2>
              <div class="demo-box" style="width: 32rem; height: 8rem;">
                <ga-insights-overview-custom-clinical></ga-insights-overview-custom-clinical>
              </div>

            {:else if selectedComponent === 'scatter-plot'}
              <h2>Scatter Plot</h2>
              <div class="demo-section">
                <h3>Slovenian (median)</h3>
                <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                  <ga-scatter-plot type="median" lang="slovenian"></ga-scatter-plot>
                </div>
                <h3>English (median)</h3>
                <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                  <ga-scatter-plot type="median"></ga-scatter-plot>
                </div>
                <h3>Shield</h3>
                <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                  <ga-scatter-plot type="shield"></ga-scatter-plot>
                </div>
                <h3>Lifestyle</h3>
                <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                  <ga-scatter-plot type="lifestyle"></ga-scatter-plot>
                </div>
              </div>

            {:else if selectedComponent === 'scatter-plot-custom'}
              <h2>Scatter Plot Custom</h2>
              <div class="demo-box" style="border-radius: 10px; width: 320px; height: 200px;">
                <ga-scatter-plot-custom type="median"></ga-scatter-plot-custom>
              </div>

            {:else if selectedComponent === 'scatter-plot-custom-clinical'}
              <h2>Scatter Plot Custom Clinical</h2>
              <div class="demo-box" style="border-radius: 10px; width: 320px; height: 200px;">
                <ga-scatter-plot-custom-clinical type="median"></ga-scatter-plot-custom-clinical>
              </div>

            {:else if selectedComponent === 'overlap-title'}
              <h2>Overlap Title</h2>
              <div class="demo-section">
                {#each ['dyslipidemia', 'coronary', 'risk'] as disease}
                  <div class="demo-box" style="width: 71.3ch; height: 11ch;">
                    <ga-overlap-title disease={disease} lang="chinese"></ga-overlap-title>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'overlap-title-three'}
              <h2>Overlap Title Three</h2>
              <div class="demo-box" style="width: 71.3ch; height: 11ch;">
                <ga-overlap-title-three disease="sle"></ga-overlap-title-three>
              </div>

            {:else if selectedComponent === 'arrow-graph'}
              <h2>Arrow Graph</h2>
              <div class="demo-section">
                {#each [
                  { subtype: 'mature', direction: 'right' },
                  { subtype: 'youth', direction: 'right' },
                  { subtype: 'shield', direction: 'left' },
                  { subtype: 'lifestyle', direction: 'right' },
                  { subtype: 'median', direction: 'left' },
                ] as { subtype, direction }}
                  <div class="demo-box" style="width: 550px; height: 82px;">
                    <ga-arrow-graph subtype={subtype} direction={direction} lang="chinese"></ga-arrow-graph>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'arrow-graph-three'}
              <h2>Arrow Graph Three</h2>
              <div class="demo-section">
                {#each [
                  { subtype: 'mature', direction: 'right', lang: 'chinese' },
                  { subtype: 'youth', direction: 'right', lang: 'chinese' },
                  { subtype: 'shield', direction: 'left', lang: 'english' },
                  { subtype: 'lifestyle', direction: 'right', lang: 'english' },
                  { subtype: 'median', direction: 'left', lang: 'english' },
                ] as { subtype, direction, lang }}
                  <div class="demo-box" style="width: 550px; height: 82px;">
                    <ga-arrow-graph-three subtype={subtype} direction={direction} lang={lang}></ga-arrow-graph-three>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'over-time'}
              <h2>Over Time</h2>
              <div class="demo-box" style="border-radius: 10px; width: 650px; height: 32rem;">
                <ga-over-time></ga-over-time>
              </div>

            {:else if selectedComponent === 'over-time-indexes-clp-ch'}
              <h2>Over Time Indexes CLP CH</h2>
              <div class="demo-box" style="border-radius: 10px; height: 588px; width: 650px;">
                {#each ['shield', 'youth', 'mature', 'median'] as type}
                  <div style="width: 100%; height: 115px; border-top: 2px solid #09341F33;">
                    <ga-over-time-indexes-clp-ch lang="english" type={type}></ga-over-time-indexes-clp-ch>
                  </div>
                {/each}
                <div style="width: 100%; height: 115px; border-top: 2px solid #09341F33; border-bottom: 2px solid #09341F33;">
                  <ga-over-time-indexes-clp-ch lang="english" type="lifestyle"></ga-over-time-indexes-clp-ch>
                </div>
              </div>

            {:else if selectedComponent === 'action-steps-three'}
              <h2>Action Steps Three</h2>
              <div class="demo-box" style="height: 600px; width: 550px;">
                <ga-action-steps-three lang="english"></ga-action-steps-three>
              </div>

            {:else if selectedComponent === 'action-steps-three-clp'}
              <h2>Action Steps Three CLP</h2>
              <div class="demo-section">
                <h3>Primary</h3>
                <div class="demo-box" style="height: 300px; width: 550px;">
                  <ga-action-steps-three-clp lang="english" type="primary"></ga-action-steps-three-clp>
                </div>
                <h3>Secondary</h3>
                <div class="demo-box" style="height: 300px; width: 550px;">
                  <ga-action-steps-three-clp lang="english" type="secondary"></ga-action-steps-three-clp>
                </div>
              </div>

            {:else if selectedComponent === 'action-steps-three-clp-ch'}
              <h2>Action Steps Three CLP CH</h2>
              <div class="demo-section">
                <h3>Primary</h3>
                <div class="demo-box" style="height: 300px; width: 550px;">
                  <ga-action-steps-three-clp-ch lang="english" type="primary"></ga-action-steps-three-clp-ch>
                </div>
                <h3>Secondary</h3>
                <div class="demo-box" style="height: 300px; width: 550px;">
                  <ga-action-steps-three-clp-ch lang="english" type="secondary"></ga-action-steps-three-clp-ch>
                </div>
              </div>

            {:else if selectedComponent === 'action-steps-three-client'}
              <h2>Action Steps Three Client</h2>
              <div class="demo-box" style="height: 600px; width: 550px;">
                <ga-action-steps-three-client></ga-action-steps-three-client>
              </div>
            {/if}

          <!-- ==================== B2B2C ==================== -->
          {:else if activeRoute === 'b2b2c'}

            {#if selectedComponent === 'main-result'}
              <h2>Main Result</h2>
              <p class="note">Also used in B2B and B2C</p>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result lang="japanese"></ga-main-result>
              </div>

            {:else if selectedComponent === 'results-overview'}
              <h2>Results Overview</h2>
              <p class="note">Also used in B2B and B2C</p>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 588px; width: 550px;">
                {#each ['age', 'shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview type={type} lang="japanese"></ga-results-overview>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview'}
              <h2>Single Overview</h2>
              <p class="note">Also used in B2B and B2C</p>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview type={type} lang="japanese"></ga-single-overview>
                  </div>
                {/each}
              </div>
            {/if}

          <!-- ==================== B2C ==================== -->
          {:else if activeRoute === 'b2c'}

            {#if selectedComponent === 'main-result'}
              <h2>Main Result</h2>
              <p class="note">Also used in B2B and B2B2C</p>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result lang="english"></ga-main-result>
              </div>

            {:else if selectedComponent === 'results-overview'}
              <h2>Results Overview</h2>
              <p class="note">Also used in B2B and B2B2C</p>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 588px; width: 550px;">
                {#each ['age', 'shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview type={type} lang="english"></ga-results-overview>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview'}
              <h2>Single Overview</h2>
              <p class="note">Also used in B2B and B2B2C</p>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview type={type} lang="english"></ga-single-overview>
                  </div>
                {/each}
              </div>
            {/if}

          <!-- ==================== CLP ==================== -->
          {:else if activeRoute === 'clp'}

            {#if selectedComponent === 'main-result-clp'}
              <h2>Main Result CLP</h2>
              <div class="demo-box" style="width: 550px;">
                <ga-main-result-clp lang="english"></ga-main-result-clp>
              </div>

            {:else if selectedComponent === 'results-overview-clp'}
              <h2>Results Overview CLP</h2>
              <div class="demo-box" style="display: flex; flex-direction: column; height: 588px; width: 550px;">
                {#each ['score', 'shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div style="width: 100%; height: 98px; border-top: 2px solid #09341F33;">
                    <ga-results-overview-clp type={type} lang="english"></ga-results-overview-clp>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview-clp'}
              <h2>Single Overview CLP</h2>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview-clp type={type} lang="english"></ga-single-overview-clp>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview-clp-new'}
              <h2>Single Overview CLP New</h2>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview-clp-new type={type} lang="english"></ga-single-overview-clp-new>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'single-overview-clp-new-ch'}
              <h2>Single Overview CLP New CH</h2>
              <div class="demo-section">
                {#each ['shield', 'youth', 'mature', 'median', 'lifestyle'] as type}
                  <div class="demo-box" style="width: 550px; height: 200px;">
                    <ga-single-overview-clp-new-ch type={type}></ga-single-overview-clp-new-ch>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'insights-overview-clp'}
              <h2>Insights Overview CLP</h2>
              <div class="demo-box" style="height: 588px; width: 550px;">
                <ga-insights-overview-clp lang="english"></ga-insights-overview-clp>
              </div>

            {:else if selectedComponent === 'insights-overview-clp-ch'}
              <h2>Insights Overview CLP CH</h2>
              <div class="demo-box" style="height: 588px; width: 550px;">
                <ga-insights-overview-clp-ch></ga-insights-overview-clp-ch>
              </div>

            {:else if selectedComponent === 'scatter-plot-clp'}
              <h2>Scatter Plot CLP</h2>
              <div class="demo-section">
                {#each ['mature', 'median', 'youth', 'shield', 'lifestyle'] as type}
                  <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                    <ga-scatter-plot-clp type={type}></ga-scatter-plot-clp>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'scatter-plot-clp-ch'}
              <h2>Scatter Plot CLP CH</h2>
              <div class="demo-box" style="border-radius: 10px; width: 550px; height: 30rem;">
                <ga-scatter-plot-clp-ch type="mature"></ga-scatter-plot-clp-ch>
              </div>

            {:else if selectedComponent === 'overlap-title-clp'}
              <h2>Overlap Title CLP</h2>
              <div class="demo-section">
                {#each ['dyslipidemia', 'coronary', 'risk'] as disease}
                  <div class="demo-box" style="width: 71.3ch; height: 11ch;">
                    <ga-overlap-title-clp disease={disease}></ga-overlap-title-clp>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'overlap-title-clp-ch'}
              <h2>Overlap Title CLP CH</h2>
              <div class="demo-section">
                {#each ['dyslipidemia', 'coronary', 'risk'] as disease}
                  <div class="demo-box" style="width: 71.3ch; height: 11ch;">
                    <ga-overlap-title-clp-ch disease={disease}></ga-overlap-title-clp-ch>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'arrow-graph-clp'}
              <h2>Arrow Graph CLP</h2>
              <div class="demo-section">
                {#each [
                  { subtype: 'mature', direction: 'right' },
                  { subtype: 'youth', direction: 'right' },
                  { subtype: 'shield', direction: 'left' },
                  { subtype: 'lifestyle', direction: 'right' },
                  { subtype: 'median', direction: 'left' },
                ] as { subtype, direction }}
                  <div class="demo-box" style="width: 550px; height: 82px;">
                    <ga-arrow-graph-clp subtype={subtype} direction={direction}></ga-arrow-graph-clp>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'arrow-graph-clp-ch'}
              <h2>Arrow Graph CLP CH</h2>
              <div class="demo-section">
                {#each [
                  { subtype: 'mature', direction: 'right' },
                  { subtype: 'youth', direction: 'right' },
                  { subtype: 'shield', direction: 'left' },
                  { subtype: 'lifestyle', direction: 'right' },
                  { subtype: 'median', direction: 'left' },
                ] as { subtype, direction }}
                  <div class="demo-box" style="width: 550px; height: 82px;">
                    <ga-arrow-graph-clp-ch subtype={subtype} direction={direction}></ga-arrow-graph-clp-ch>
                  </div>
                {/each}
              </div>

            {:else if selectedComponent === 'over-time-clp'}
              <h2>Over Time CLP</h2>
              <div class="demo-box" style="border-radius: 10px; width: 650px; height: 32rem;">
                <ga-over-time-clp></ga-over-time-clp>
              </div>
            {/if}

          {/if}

        </div>
      </div>
    {/if}
  </main>
</div>

<style>
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background: #f8f9fa;
    color: #1a1a2e;
  }

  .layout {
    display: flex;
    min-height: 100vh;
  }

  /* ── Sidebar ── */

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 200px;
    background: #09341F;
    display: flex;
    flex-direction: column;
    z-index: 100;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.75rem 1.25rem 1.5rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .logo :global(svg path) {
    fill: #fff;
  }

  .sidebar-nav {
    display: flex;
    flex-direction: column;
    padding: 1rem 0.75rem;
    gap: 0.25rem;
    flex: 1;
  }

  .sidebar-link {
    display: block;
    width: 100%;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 8px;
    background: transparent;
    color: rgba(255, 255, 255, 0.65);
    font-size: 0.95rem;
    font-weight: 500;
    text-align: left;
    cursor: pointer;
    transition: all 0.15s ease;
  }

  .sidebar-link:hover {
    background: rgba(255, 255, 255, 0.08);
    color: #fff;
  }

  .sidebar-link.active {
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-weight: 600;
  }

  .sidebar-footer {
    padding: 1rem 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }

  .sidebar-badge {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.35);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  /* ── Content ── */

  .content {
    margin-left: 200px;
    flex: 1;
    padding: 2.5rem 3rem;
    max-width: 1100px;
  }

  .catalog-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin: 0 0 2rem;
    color: #1a1a2e;
  }

  .category {
    margin-bottom: 2rem;
  }

  .category-name {
    font-size: 0.85rem;
    font-weight: 600;
    color: #888;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    margin: 0 0 0.6rem;
    padding-bottom: 0.4rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 0.6rem;
    margin-bottom: 0.5rem;
  }

  .card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.85rem 1rem;
    background: #fff;
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.15s ease;
    text-align: left;
    font-size: 0.875rem;
    font-weight: 500;
    color: #1a1a2e;
  }

  .card:hover {
    border-color: #E76538;
    box-shadow: 0 2px 12px rgba(231, 101, 56, 0.1);
    transform: translateY(-1px);
  }

  .card-name {
    flex: 1;
  }

  .card-arrow {
    color: #E76538;
    font-size: 1rem;
    margin-left: 0.5rem;
    opacity: 0;
    transition: opacity 0.15s ease;
  }

  .card:hover .card-arrow {
    opacity: 1;
  }

  /* ── Detail view ── */

  .back-btn {
    display: inline-flex;
    align-items: center;
    padding: 0.45rem 0.9rem;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.825rem;
    color: #555;
    margin-bottom: 1.5rem;
    transition: all 0.15s ease;
  }

  .back-btn:hover {
    border-color: #E76538;
    color: #E76538;
  }

  .detail-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .detail-body h2 {
    font-size: 1.4rem;
    margin: 0 0 0.25rem;
  }

  .detail-body h3 {
    font-size: 0.95rem;
    color: #666;
    margin: 1.25rem 0 0.4rem;
  }

  .note {
    font-size: 0.8rem;
    color: #999;
    font-style: italic;
    margin: 0 0 1.25rem;
  }

  .demo-box {
    border: 1px dashed #ddb8a8;
    margin-bottom: 0.6rem;
  }

  .demo-section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.35rem;
    width: 100%;
  }

  .demo-section h3 {
    align-self: center;
  }
</style>
