<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label required-label">Titel / Thema</label>
			<input type="text" class="form-control" id="title" placeholder="Veranstaltungsbezeichnung" required>
		</div>

		<div class="mb-3 row">
			<div class="col">
				<label for="trainer" class="form-label required-label">Trainer</label>
				<input type="text" class="form-control" id="trainer" placeholder="Trainer" required>
			</div>
			<div class="col">
				<label for="organizer" class="form-label">Organisator</label>
				<input type="text" class="form-control" id="organizer" placeholder="Organisator">
			</div>
		</div>

		<div class="mb-3 row">
			<div class="col">
				<label for="startDate" class="form-label required-label">Start</label>
				<div class="input-group">
					<input type="date" class="form-control" id="startDate" required>
					<input type="time" class="form-control" id="startTime">
				</div>
			</div>
			<div class="col">
				<label for="endDate" class="form-label">Ende</label>
				<div class="input-group">
					<input type="date" class="form-control" id="endDate">
					<input type="time" class="form-control" id="endTime">
				</div>
			</div>
		</div>

		<div class="mb-3 row">
			<div class="col">
				<label class="form-label required-label">Veranstaltungsart</label>
				<div class="btn-group d-flex">
					<input type="radio" class="btn-check" name="type" id="typeExternal" autocomplete="off" required>
					<label class="btn btn-outline-secondary" for="typeExternal">Extern</label>
					<input type="radio" class="btn-check" name="type" id="typeInternal" autocomplete="off" required>
					<label class="btn btn-outline-secondary" for="typeInternal">Intern</label>
				</div>
			</div>
			<div class="col">
				<label class="form-label required-label">Ort</label>
				<div class="btn-group d-flex">
					<input type="radio" class="btn-check" name="location" id="locationRemote" autocomplete="off" required>
					<label class="btn btn-outline-secondary" for="locationRemote">Remote</label>
					<input type="radio" class="btn-check" name="location" id="locationPresence" autocomplete="off" required>
					<label class="btn btn-outline-secondary" for="locationPresence">Präsenz</label>
				</div>
			</div>
		</div>

		<div class="mb-3 row">
			<div class="col">
				<label for="address" class="form-label">Veranstaltungsadresse</label>
				<input type="text" class="form-control" id="address" placeholder="postalische Adresse / URL">
			</div>
			<div class="col">
				<label for="link" class="form-label">Weiterführender Link</label>
				<input type="url" class="form-control" id="link" placeholder="https://url">
			</div>
		</div>

		<div class="mb-3">
			<label for="targetGroup" class="form-label required-label">Zielgruppe</label>
			<textarea class="form-control" id="targetGroup" placeholder="Veranstaltungsbeschreibung" required></textarea>
		</div>

		<div class="mb-3">
			<button  type="submit" class="btn btn-primary">Erstellen</button>
		</div>
	</form>
</template>

<script>
export default {
  name: 'Overview',
  props: {}
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
