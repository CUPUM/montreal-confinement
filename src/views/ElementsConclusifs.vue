<template>
	<div class="meta" >
	<div class="meta" v-bar ref="vbar">
	<div id="elements-conclusifs" class="view-scroll">
		<PageTitle/>
		<div class="center-col">
			<p>La réflexion menée sous le titre <em>Montréal, paysage en confinement</em> (COVID-19) a porté principalement sur deux aspects particuliers, soient une veille informationnelle et un relevé de photographies de presse et professionnelles.</p>
			<p>Le premier volet d’analyse a permis de saisir l’importance des enjeux reliés aux modes de vie et à l’aménagement urbain, de caractériser les préoccupations publiques et sociales envers l’espace public tout comme d’identifier les figures dominantes de la population interpellées durant le confinement de la COVID-19. De plus, cette analyse révèle un intérêt très marqué pour l’espace public. La <i class="hl">rue</i> et le <i class="hl">parc public</i> constituent les deux principaux attributs du paysage urbain. Il est à noter également l’émergence de nouveaux attributs qui ont marqué l’aménagement de l’espace urbain montréalais, soit le <i class="hl">corridor sanitaire</i> et les <i class="hl">voies actives sécuritaires</i>. Ces derniers renvoient à la question de la mobilité montréalaise dans cette crise sanitaire où le ralentissement des flux automobiles généré par le télétravail et la difficile gestion des transports en commun ont favorisé la «{{'\xa0'}}<i class="hl">mobilité lente</i>{{'\xa0'}}» auprès des Montréalais. Le <i class="hl">vélo</i> et la <i class="hl">marche</i> ont rapidement gagné en popularité à Montréal et la municipalité semble avoir saisi cette crise sanitaire pour élargir rapidement son réseau de pistes cyclables. Par ailleurs, le qualificatif le plus souvent utilisé pour décrire l’«{{'\xa0'}}<i class="hl">Homo urbanus montréalais</i>{{'\xa0'}}» est le <i class="hl">piéton</i>. Ceci confirme l’intérêt accordé à la <i class="hl">mobilité lente</i> et surtout de l’importance à vivre l’espace public extérieur dans cette période de crise sanitaire. La rue et le parc de quartiers semblent constituer les antidotes du confinement montréalais confirmant ainsi l’enjeu du paysage de proximité. Sur d’autres considérations, la veille informationnelle a révélé une grande préoccupation envers la population itinérante montréalaise (réf.{{'\xa0'}}: sans-abri) et les problèmes de vie et d’accueil de celle-ci dans les espaces publics. Ceux-ci semblent s’être adaptés significativement avec la mise en place de <i class="hl">centres de jour</i>, <i class="hl">centres d’hébergement d’urgence</i> et de <i class="hl">haltes-répit</i>.</p>
			<p>Le deuxième volet d’analyse concernait la lecture paysagère des regards photographiques, soit les cadrages visuels de l’espace public montréalais. Les photographies urbaines à travers l’histoire ont majoritairement rapporté le caractère aminé, chaleureux et actif des espaces publics. L’animation urbaine est exempte des cadrages photographiques montréalais. La ville n’est plus la vie. L’urbain révèle un simple (et parfois majestueux) décor architectural et urbanistique sans acteur. Malgré la présence importante de la lumière, les photographes ont dépeint Montréal comme une ville <i class="hl">solitaire</i>, <i class="hl">froide</i> et <i class="hl">figée</i>. Cette lecture est d’autant marquée que le confinement montréalais prenait place dans un entre-deux saisonnier nordique et aride (hivers/printemps). Toutefois, l’interprétation de ces cadrages photographiques a permis de révéler des <i class="hl">expressions sublimantes</i> de la ville en mode confinement. Ainsi, la crise sanitaire du COVID-19 a révélé la force et la singularité des architectures montréalaises (des passages et des façades de bâtiment) et des espaces souterrains sous la lumière crue des éclairages naturels et artificiels. Ce confinement a transcendé le «{{'\xa0'}}beau{{'\xa0'}}» dans la ville, soit les vues attendues, équilibrées par ces formes et rassurantes par ses ambiances urbaines connues de vie, de couleur et de chaleur. Cette interprétation photographique a également rapporté les expressions et impressions paysagères où le regard envers l’espace de proximité est fragmentaire. Il est fermé sur lui-même et empreint de solitude.</p>
			<p>Pour conclure, cette réflexion a révélé un portrait global du paysage urbain montréalais en mode confinement avec les limites d’une analyse de veille informationnelle qui ne peut qu’être partielle face au vécu d’une population et d’une société en crise sanitaire. Il s’agit d’un aperçu. De plus, cette réflexion s’est confrontée aux contraintes du confinement lui-même du 13{{'\xa0'}}mars au 16{{'\xa0'}}mai 2020. L’observation directe sur le terrain (balisage photographique, entrevues, etc.) aurait sans nul doute complété certains constats. Toutefois, cette réflexion a permis de communiquer les principales préoccupations sociales et politiques d’un paysage urbain en confinement.</p>
			<p>Par ailleurs, elle amène à nous questionner sur la viabilité des mesures post-confinement de la COVID-19 sur les espaces publics montréalais qui semble s’engager dans une ère post-hygiéniste. Comment peut-on favoriser et rendre accessible à tous, la nature et le grand air en ville{{'\xa0'}}? Comment réinventer le cadre et l’espace de vie publique et privée; la rue, les trottoirs, les parcs, les aires de jeux, l’habitat domiciliaire, les commerces, les lieux de travail{{'\xa0'}}? Comment, peut-on repenser la centralité montréalaise (ref{{'\xa0'}}: centre-ville) pour maintenir sa vitalité commerciale et économique{{'\xa0'}}? De quelle manière peut-on envisager de maintenir la densité urbaine viable (et durable) face aux pandémies{{'\xa0'}}? Comment recréer les espaces collectifs pour sauvegarder la culture en ville{{'\xa0'}}? Quels seront les contours d’un cadre de vie et d’une convivialité urbaine soucieuse des uns et autres{{'\xa0'}}? etc.</p>
			<p>Les contours des lendemains du confinement de la COVID-19 restent encore très flous malgré l’engagement créatif des architectes et designers urbains pour assurer les cadres de vie transitoires des espaces publics de Montréal et d’ailleurs. Toutefois et en regard des grands forums internationaux sur le post-confinement, les questionnements de fonds sont encore en quête de réponses.</p>
			
			<ChapterNav :previous="true" :next="true" />
		</div>
	</div>
	</div>
	</div>
</template>

<script>
import PageTitle from '@/components/PageTitle'
import ChapterNav from '@/components/ChapterNav'

export default {
	name: 'ElementsConclusifs',
	components: {
		PageTitle,
		ChapterNav
	},
	activated() {
		this.$vuebar.refreshScrollbar(this.$refs.vbar)
	}
}
</script>

<style scoped>
#elements-conclusifs {
	width: 100%;
	height: 100%;
}
.hl {
	font-weight: 500;
	color: rgb(91, 121, 71);
}
</style>