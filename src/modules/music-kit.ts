// import { NativeModules } from 'react-native';
// import type { CatalogSearchType, ICatalogSearch } from '../types/catalog-search';
// import type { MusicItem } from '../types/music-item';
// import type { ITracksFromLibrary } from '../types/tracks-from-library';

// const { MusicModule } = NativeModules;

// interface IEndlessListOptions {
//   offset?: number;
//   limit?: number;
// }

// class MusicKit {
//   /**
//    * Searches the Apple Music catalog using the specified search terms, types, and options.
//    * @param {string} search - The search query string.
//    * @param {CatalogSearchType[]} types - The types of catalog items to search for.
//    * @param {IEndlessListOptions} [options] - Additional options for the search.
//    * @returns {Promise<ISong[]>} A promise that resolves to the search results.
//    */
//   public static async catalogSearch(
//     search: string,
//     types: CatalogSearchType[],
//     options?: IEndlessListOptions,
//   ): Promise<ICatalogSearch | undefined> {
//     try {
//       return (await MusicModule.catalogSearch(search, types, options)) as ICatalogSearch;
//     } catch (error) {
//       console.error('Apple Music Kit: Catalog Search failed.', error);

//       return {
//         songs: [],
//         albums: [],
//       };
//     }
//   }

//   /**
//    * @param itemId - ID of collection to be set in a player's queue
//    * @param {MusicItem} type - Type of collection to be found and set
//    * @returns {Promise<boolean>} A promise is resolved when tracks successfully added to a queue
//    */
//   public static async setPlaybackQueue(itemId: string, type: MusicItem): Promise<void> {
//     try {
//       await MusicModule.setPlaybackQueue(itemId, type);
//     } catch (error) {
//       console.error('Apple Music Kit: Setting Playback Failed.', error);
//     }
//   }

//   /**
//    * Get a list of recently played items in user's library
//    * @return {Promise<ITracksFromLibrary[]>} A promise returns a list of recently played items including tracks, playlists, stations, albums
//    */
//   public static async getTracksFromLibrary(): Promise<ITracksFromLibrary> {
//     try {
//       const result = await MusicModule.getTracksFromLibrary();

//       return result as ITracksFromLibrary;
//     } catch (error) {
//       console.error('Apple Music Kit: Getting tracks from user library failed.', error);

//       return {
//         recentlyPlayedItems: [],
//       };
//     }
//   }
// }

// export default MusicKit;


import { NativeModules } from 'react-native';
import type { CatalogSearchType, ICatalogSearch } from '../types/catalog-search';
import type { MusicItem } from '../types/music-item';
import type { ITracksFromLibrary } from '../types/tracks-from-library';

const { MusicModule } = NativeModules;

interface IEndlessListOptions {
  offset?: number;
  limit?: number;
}

class MusicKit {
  /**
   * Searches the Apple Music catalog using the specified search terms, types, and options.
   * @param {string} search - The search query string.
   * @param {CatalogSearchType[]} types - The types of catalog items to search for.
   * @param {IEndlessListOptions} [options] - Additional options for the search.
   * @returns {Promise<ICatalogSearch | undefined>} A promise that resolves to the search results.
   */
  public static async catalogSearch(
    search: string,
    types: CatalogSearchType[],
    options?: IEndlessListOptions,
  ): Promise<ICatalogSearch | undefined> {
    try {
      return (await MusicModule.catalogSearch(search, types, options)) as ICatalogSearch;
    } catch (error) {
      console.error('Apple Music Kit: Catalog Search failed.', error);

      return {
        songs: [],
        albums: [],
      };
    }
  }

  /**
   * Adds a collection to the player's queue with optional start and end times for songs.
   * @param itemId - ID of collection to be set in a player's queue
   * @param type - Type of collection (e.g., song, album, playlist)
   * @param startTime - Optional start time for songs (in seconds)
   * @param endTime - Optional end time for songs (in seconds)
   * @returns {Promise<void>} A promise that resolves when tracks are successfully added to the queue.
   */
  public static async setPlaybackQueue(
    itemId: string,
    type: MusicItem,
    startTime?: number,  // Optional start time for songs
    endTime?: number     // Optional end time for songs
  ): Promise<void> {
    try {
      // If startTime and endTime are provided for songs, pass them to the native module.
      if (type === 'song' && startTime !== undefined && endTime !== undefined) {
        await MusicModule.setPlaybackQueue(itemId, type, startTime, endTime);
      } else {
        // If not a song or no start/end times, just add the item to the queue
        await MusicModule.setPlaybackQueue(itemId, type);
      }
    } catch (error) {
      console.error('Apple Music Kit: Setting Playback Failed.', error);
    }
  }

  /**
   * Get a list of recently played items in user's library.
   * @return {Promise<ITracksFromLibrary[]>} A promise that returns a list of recently played items including tracks, playlists, stations, albums.
   */
  public static async getTracksFromLibrary(): Promise<ITracksFromLibrary> {
    try {
      const result = await MusicModule.getTracksFromLibrary();

      return result as ITracksFromLibrary;
    } catch (error) {
      console.error('Apple Music Kit: Getting tracks from user library failed.', error);

      return {
        recentlyPlayedItems: [],
      };
    }
  }
}

export default MusicKit;
