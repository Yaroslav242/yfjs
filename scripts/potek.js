/*
Potok artillery - uses liquid and electricity to shoot liquidCapsuleSlag
Ammo types:
- Slag
- Oil
- Water
- Cryo
*/

var baseAmmoCon = 0.1; // Base ammo consumption of ammo types
var baseDamage = 60; // Base ammo splash damage
var baseSplash = 25; // Base ammo splash radius

// Slag-based ammo - spread fire and double splash damage
const liquidCapsuleSlag = extend(ArtilleryBulletType, {

	hitEffect : Fx.flakExplosion,
	lifetime : 80,
	width : 15,
	height : 15,
	collidesTiles : false,
	splashDamageRadius : baseSplash,
	splashDamage : baseDamage * 2,
	speed : 4.5,
	frontColor : Pal.lightishOrange,
	backColor : Pal.lightOrange,
	ammoMultiplier : baseAmmoCon,
	status : StatusEffects.burning,
	incendChance : 1,
	incendAmount : 3,
	incendSpread : 10,

	hit(b) {
		// Deposit slag at hit tile
		Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.slag, 40);
		this.super$hit(b,b.x,b.y);
	}
});


// Oil-based ammo - increase fire damage and slow enemies
const liquidCapsuleOil = extend(ArtilleryBulletType, {
	hitEffect : Fx.flakExplosion,
	lifetime : 80,
	width : 15,
	height : 15,
	collidesTiles : false,
	splashDamageRadius : baseSplash,
	splashDamage : baseDamage,
	speed : 4.5,
	frontColor : Color.valueOf("313131"),
	ammoMultiplier : baseAmmoCon,
	status : StatusEffects.tarred,
	statusDuration : 60 * 2,

	hit(b){
		// Deposit oil at hit tile
		Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.oil, 40);
		this.super$hit(b,b.x,b.y);
	}
});

// Water-based ammo - increased splash radius and splashed effect
const liquidCapsuleWater= extend(ArtilleryBulletType, {
	hitEffect : Fx.flakExplosionBig,
	lifetime : 80,
	width : 15,
	height : 15,
	collidesTiles : false,
	splashDamageRadius : baseSplash * 1.2,
	splashDamage : baseDamage,
	speed : 4.5,
	frontColor : Color.valueOf("596ab8"),
	backColor : Color.valueOf("4aa2b8"),
	ammoMultiplier : baseAmmoCon * 0.5,
	status : StatusEffects.wet,
	statusDuration : 60 * 2,

	hit(b){
		// Deposit water at hit tile
		Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.water, 40);
		this.super$hit(b,b.x,b.y);
	}
});



// Cryo-based ammo - freeze enemies
const liquidCapsuleCryo = extend(ArtilleryBulletType, {
	hitEffect : Fx.flakExplosion,
	lifetime : 80,
	width : 15,
	height : 15,
	collidesTiles : false,
	splashDamageRadius : baseSplash,
	splashDamage : baseDamage,
	speed : 4.5,
	frontColor : Color.valueOf("6ecdec"),
	backColor : Color.valueOf("6ecdec"),
	ammoMultiplier : baseAmmoCon,
	status : StatusEffects.freezing,
	statusDuration : 60 * 4,

	hit(b){
		// Deposit cryofluid at hit tile
		Puddles.deposit(Vars.world.tileWorld(b.x, b.y), Liquids.cryofluid, 40);
		this.super$hit(b,b.x,b.y);
	}
});


// Turret object (electricity cost defined in .hjson)
const potek = extend(LiquidTurret, "potek", {
	health : 2250,
	size : 3,
	rotateSpeed : 3.5,
	reloadTime : 35,
	shootShake : 2,
	recoil : 4,
	range : 290,
	targetAir : false,
	targetGround : true,
	liquidCapacity : 20,
	shootSound : Sounds.shootBig,
	loopSound : Sounds.hum,
	extinguish : false, // Set true for it to extinguish stuff like a lame wave :/
	localizedName : "potek",
	description : "\"Launch THICC projectiles and spill juices all over your naughty enemies!\" \n \- Sun Tzu, Art of War",
	buildVisibility : BuildVisibility.shown,
	requirements : ItemStack.with(Items.titanium, 80, Items.silicon, 45, Items.plastanium, 65, Items.metaglass, 200),
	category : Category.turret,
	inaccuracy : 2
});
// Set ammo types as capsules we created
potek.ammo(
		Liquids.slag, liquidCapsuleSlag,
		Liquids.water, liquidCapsuleWater,
		Liquids.oil, liquidCapsuleOil,
		Liquids.cryofluid, liquidCapsuleCryo,
)
