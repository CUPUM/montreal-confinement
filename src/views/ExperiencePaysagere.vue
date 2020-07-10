<template>
	<div id="identite-conceptuelle" class="view-scroll">
		<h1>Interprétation de l’expérience paysagère</h1>
		<div class="center-col">
			<p>Suite à l’interprétation des cadrages photographiques de photographes montréalais lors du confinement, il a été convenu de transposer cette interprétation en schéma pour qualifier la notion de paysage urbain et de saisir sa particularité en période de confinement. Quel est le sens accordé à cette notion qui exprime l’expérience que nous avons de la ville et de ces espaces publics{{'\xa0'}}? Quels sont les éléments (ou attributs) qui prédominent dans l’expérience paysagère des photographes{{'\xa0'}}? En prenant appui sur la schématisation du concept de paysage urbain (Poullaouec-Gonidec & Paquette, 2005, pp. 275-318), quelles sont les formes paysagères, les thèmes soutenus et les intentions évoqués dans l’interprétation des cadrages des photographes{{'\xa0'}}? Plus encore, quelles sont les expressions et impressions paysagères qui se dégagent de ces regards sur la ville en mode confinement{{'\xa0'}}? Et plus largement de quelle manière, le confinement a-t-il contribué à l’invention d’un regard sur la ville{{'\xa0'}}?</p>
			<p>Les réponses à ces questionnements s’expriment sous la forme d’un schéma interactif présenté ci-dessous.</p>

			<p>Insérer schéma avec "tooltips"</p>

			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
</template>

<script>
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'ExperiencePaysagere',
	components: {
		ChapterNav
	}
}
</script>

<style scoped>
#identite-conceptuelle {
	width: 100%;
	height: 100%;
}
</style>