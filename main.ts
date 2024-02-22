namespace SpriteKind {
    export const BackGround_Image = SpriteKind.create()
}
function Enemy_EEPiness () {
    if (PowerAble >= 1) {
        Enemy_sprites.setVelocity(100, 100)
    } else {
    	
    }
}
function PowerFluctuation (Power: boolean) {
    if (PowerAble >= 1) {
        multilights.toggleLighting(false)
    } else if (PowerAble < 1) {
        multilights.toggleLighting(true)
    }
}
function TurnedEnemySpawning () {
    SpawnLocations = tiles.getTilesByType(assets.tile`budding_tile`)
    for (let index = 0; index < 20; index++) {
        Enemy_sprites = sprites.create(Turned_EnemyImages._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(Enemy_sprites, SpawnLocations.removeAt(randint(0, SpawnLocations.length - 1)))
    }
}
function Awakening_Cutscene () {
    scene.setBackgroundImage(assets.image`City_NotDestroyed`)
    game.showLongText("It was a normal day in the city", DialogLayout.Bottom)
    scene.setBackgroundImage(assets.image`Lab_Incident`)
    game.showLongText("Until...", DialogLayout.Top)
    scene.setBackgroundImage(assets.image`Plant_Mutation`)
    pause(500)
    scene.setBackgroundImage(assets.image`Plant_Mutation2`)
    pause(500)
    scene.setBackgroundImage(assets.image`InfectionScene`)
    HumanCutscene = sprites.create(assets.image`Daishckds_cutscene`, SpriteKind.Player)
    HumanCutscene.setPosition(128, 111)
    InfectedCutscene = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    InfectedCutscene.setPosition(28, 111)
    story.spriteMoveToLocation(InfectedCutscene, 128, 111, 75)
    pause(1000)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    scene.setBackgroundImage(assets.image`InfectionScene2`)
    InfectedCutscene = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    InfectedCutscene.setPosition(128, 111)
    INfectedCutscene2 = sprites.create(assets.image`turned_small`, SpriteKind.Player)
    INfectedCutscene2.setPosition(145, 111)
    pause(500)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    scene.setBackgroundImage(assets.image`City_Turned`)
    pause(1000)
}
let INfectedCutscene2: Sprite = null
let InfectedCutscene: Sprite = null
let HumanCutscene: Sprite = null
let SpawnLocations: tiles.Location[] = []
let Enemy_sprites: Sprite = null
let Turned_EnemyImages: Image[] = []
let PowerAble = 0
Awakening_Cutscene()
scene.setBackgroundImage(assets.image`acid_background`)
tiles.setCurrentTilemap(tilemap`The_Main_Level`)
let protagonist = sprites.create(assets.image`Prisoner_9341`, SpriteKind.Player)
tiles.placeOnRandomTile(protagonist, assets.tile`bed`)
scene.cameraFollowSprite(protagonist)
controller.moveSprite(protagonist, 175, 175)
PowerAble = 1
multilights.addLightSource(protagonist, 10)
PowerFluctuation(true)
Turned_EnemyImages = [assets.image`turned_large`, assets.image`turned_small`, assets.image`PlunderCrawler`]
TurnedEnemySpawning()
