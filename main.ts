namespace SpriteKind {
    export const BackGround_Image = SpriteKind.create()
    export const Keycard1 = SpriteKind.create()
    export const Machine = SpriteKind.create()
    export const Keycard2 = SpriteKind.create()
    export const Keycard3 = SpriteKind.create()
    export const Keycard4 = SpriteKind.create()
    export const Keycard5 = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard2, function (sprite, otherSprite) {
    sprites.destroy(KeyCard2)
    protagonist.sayText("I got a level 2 kaycard", 2000, false)
    tiles.setWallAt(tiles.getTileLocation(123, 112), false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Keycard1, function (sprite, otherSprite) {
    sprites.destroy(KeyCard1)
    protagonist.sayText("I got a level 1 kaycard", 2000, false)
    Upgradability = 1
})
function PowerFluctuation (Power: boolean) {
    if (PowerAble == 1) {
        multilights.toggleLighting(false)
    } else if (PowerAble == 0) {
        multilights.toggleLighting(true)
    }
}
function UpgradeSystem () {
    if (Upgradability == 1) {
        tiles.placeOnRandomTile(KeyCard2, assets.tile`Output_tile`)
        PowerAble = 0
        PowerFluctuation(true)
    } else if (Upgradability == 2) {
        tiles.placeOnRandomTile(KeyCard3, assets.tile`Output_tile`)
        PowerAble = 1
        PowerFluctuation(true)
    } else if (Upgradability == 3) {
        tiles.placeOnRandomTile(KeyCard4, assets.tile`Output_tile`)
        PowerAble = 0
        PowerFluctuation(true)
    } else if (Upgradability == 4) {
        tiles.placeOnRandomTile(Omni_key, assets.tile`Output_tile`)
        PowerAble = 1
        PowerFluctuation(true)
    }
}
function TurnedEnemySpawning () {
    SpawnLocations = tiles.getTilesByType(assets.tile`budding_tile`)
    // Make a list of random velocities for enemies then change them depending on lights on or off
    for (let index = 0; index < 20; index++) {
        Enemy_sprites = sprites.create(Turned_EnemyImages._pickRandom(), SpriteKind.Enemy)
        tiles.placeOnTile(Enemy_sprites, SpawnLocations.removeAt(randint(0, SpawnLocations.length - 1)))
        Enemy_sprites.setVelocity(25, 25)
        Enemy_sprites.follow(protagonist)
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`target_tile`, function (sprite, location) {
    UpgradeSystem()
})
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
let Enemy_sprites: Sprite = null
let SpawnLocations: tiles.Location[] = []
let Upgradability = 0
let Omni_key: Sprite = null
let KeyCard4: Sprite = null
let KeyCard3: Sprite = null
let KeyCard2: Sprite = null
let KeyCard1: Sprite = null
let Turned_EnemyImages: Image[] = []
let PowerAble = 0
let protagonist: Sprite = null
Awakening_Cutscene()
scene.setBackgroundImage(assets.image`acid_background`)
tiles.setCurrentTilemap(tilemap`The_Main_Level`)
protagonist = sprites.create(assets.image`Prisoner_9341`, SpriteKind.Player)
tiles.placeOnRandomTile(protagonist, assets.tile`bed`)
scene.cameraFollowSprite(protagonist)
controller.moveSprite(protagonist, 175, 175)
PowerAble = 1
multilights.addLightSource(protagonist, 10)
PowerFluctuation(true)
Turned_EnemyImages = [assets.image`turned_large`, assets.image`turned_small`, assets.image`PlunderCrawler`]
TurnedEnemySpawning()
KeyCard1 = sprites.create(assets.image`Keycard1`, SpriteKind.Keycard1)
KeyCard2 = sprites.create(assets.image`Keycard2`, SpriteKind.Keycard2)
KeyCard3 = sprites.create(assets.image`Keycard3`, SpriteKind.Keycard3)
KeyCard4 = sprites.create(assets.image`Keycard4`, SpriteKind.Keycard4)
Omni_key = sprites.create(assets.image`Omni_key`, SpriteKind.Keycard5)
tiles.placeOnRandomTile(KeyCard1, assets.tile`Dead_turned_small`)
let Upgrade_Machine = sprites.create(assets.image`Upgrade_machine`, SpriteKind.Machine)
tiles.placeOnTile(Upgrade_Machine, tiles.getTileLocation(11, 99))
Upgradability = 0
