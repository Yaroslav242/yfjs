
// Create and load Uley unit
const uley_module = require("uley");

// const matRequirement = ItemStack.with(Items.silicon, 45, Items.sporePod, 20);
// const uleyPlan = new UnitFactory.UnitPlan( uley_module.uley_unit , 60 * 30, matRequirement );
// Blocks.airFactory.plans.add(uleyPlan);

// Create spore reconstructor and set up stats
const spore_factory = extend(Reconstructor, 'spore-reconstructor', {
  buildVisibility: BuildVisibility.shown,
  size: 5,
  category: Category.units,
  constructTime: 60 * 15
});

spore_factory.consumes.power(3);

spore_factory.requirements = ItemStack.with(
    Items.copper, 350,
    Items.lead, 450,
    Items.silicon, 200,
    Items.metaglass, 300,
    Items.sporePod, 5,
);
spore_factory.consumes.items(ItemStack.with(
    Items.sporePod, 80,
    Items.silicon, 50,
));
spore_factory.consumes.liquid(Liquids.water, 0.1);

const createUnitPlan = (unitFrom, unitTo) => {
    var a = java.util.Arrays.copyOf(Blocks.tetrativeReconstructor.upgrades.get(0), 2);
    a[0] = unitFrom;
    a[1] = unitTo;
    return a;
}

// Add units to spore reconstructor
spore_factory.upgrades.add(
    createUnitPlan(UnitTypes.mega,uley_module.uley_unit)// uley_module.uley_unit),
);
