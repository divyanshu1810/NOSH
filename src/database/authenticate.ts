import { Dish } from "../dao/dish";
import sequelize from "./index";

export const initializeDatabase = async (): Promise<void> => {
  try {
    console.log('🔗 Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    console.log('📊 Syncing database models...');
    
    await sequelize.sync({ 
      force: false,
      alter: true,
    });

    console.log('Tables :', Dish.getTableName);
    
    console.log('✅ Database models synced successfully.');
    console.log('📝 Tables created/updated:');

  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  }
};