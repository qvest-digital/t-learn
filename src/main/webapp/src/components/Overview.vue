<template>
	<div class="row g-3">
		{{#courses}}
			<div class="col">
				<div class="card overview-card">
					<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Orang-Utans.jpg/2880px-Orang-Utans.jpg" class="card-img-top" alt="{TITLE}">
					<div class="card-body">
						<h5 class="card-title">{{title}}</h5>
						<p class="card-text">
							{{targetAudience}}
							<a href="#" class="stretched-link"></a>
						</p>
					</div>
				</div>
			</div>
		{{/courses}}
	</div>
</template>

<script>
export default {
  name: 'Overview',
  props: {
    courses: {
      title: String,
      targetAudience: String
    }
  }
}
</script>

<style scoped>
.overview-card {
	min-width:18rem;
	max-width:36rem;
}

.main-container {
	flex: 1 0 auto;
}

.required-label::after {
	color: red;
	font-weight: bold;
	content: '\00a0*';
}
</style>
