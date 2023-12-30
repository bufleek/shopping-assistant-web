import { doc, getDoc } from "firebase/firestore";

import { db } from "../../lib/firebase";

export interface AppConfigs {
  data_source: DataSource;
}

export interface DataSource {
  base_url: string;
  platforms: Platform[];
}

export interface Platform {
  active: boolean;
  name: string;
  key: string;
  url: string;
  pd_config: ProductDescriptionConfig | undefined | null;
}

export interface ProductDescriptionConfig {
  base_url: string;
}

export async function fetchAppConfigs(): Promise<AppConfigs> {
    try {
        const dataSourcesSnap = await getDoc(
            doc(db, "app_configs", "data_sources")
        );
        if (dataSourcesSnap.exists()) {
            const dataSource = dataSourcesSnap.data();
            const filteredPlatforms = dataSource.platforms.filter(
                (platform: Platform) => platform.active
            );
            const filteredDataSource = { ...dataSource, platforms: filteredPlatforms };
            return { data_source: filteredDataSource } as AppConfigs;
        }
    } catch (error) {
        console.error(error);
        throw Error("Failed to fetch app configs");
    }

    throw new Error("App Configs not found");
}
