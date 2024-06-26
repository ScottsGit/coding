import { faker } from "@faker-js/faker";
import { useEffect, useState, useCallback } from "react";
// !!! only for test

// const generateUser = () => {
//   const currentDate = new Date();
//   const oneYearAgo = new Date(currentDate);
//   oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
//   const createdAt = faker.date.between({ from: oneYearAgo, to: currentDate });

//   return {
//     id: faker.string.uuid(),
//     location: `${faker.location.city()}, ${faker.location.state({
//       abbreviated: true,
//     })}`,
//     createdAt: createdAt,
//   };
// };

// const membersData = async (amount = 200) => {
//   return await Promise.all(Array.from({ length: amount }, generateUser));
// };

// const membersDataByLocation = async (city, state, amount = 200) => {
//   return new Promise((resolve, reject) => {
//     const data = Array.from({ length: amount }, generateUser).filter(
//       (item) => item.location === `${city}, ${state}`
//     );
//     if (data.length > 0) {
//       resolve(data);
//     } else {
//       reject(new Error("No data found!"));
//     }
//   });
// };

// export { membersData, membersDataByLocation };

const useMembersFakeData = (amount = 200) => {
  const generateUser = () => {
    const currentDate = new Date();
    const oneYearAgo = new Date(currentDate);
    oneYearAgo.setFullYear(currentDate.getFullYear() - 1);
    const createdAt = faker.date.between({
      from: oneYearAgo,
      to: currentDate,
    });
    const joinedAt = faker.date.between({
      from: oneYearAgo,
      to: currentDate,
    });
    const updatedAt = faker.date.between({
      from: oneYearAgo,
      to: currentDate,
    });

    return {
      id: faker.string.uuid(),
      location: `${faker.location.city()}, ${faker.location.state({
        abbreviated: true,
      })}`,
      industry: `Industry ${Math.floor(Math.random() * 20)}`,
      discipline: `Discipline ${Math.floor(Math.random() * 20)}`,
      country: faker.location.country(),
      state: faker.location.state(),
      city: faker.location.city(),
      createdAt: createdAt,
      joinedAt: joinedAt,
      updatedAt: updatedAt,
    };
  };

  const membersData = () => {
    return Array.from({ length: amount }, generateUser);
  };
  const [members, setMembers] = useState(membersData());

  useEffect(() => {}, []);

  const fetchMembersFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      if (members && members.length > 0) {
        resolve(members);
      } else {
        reject(new Error("No members found!"));
      }
    });
  }, [members]);

  const fetchMembersFakeDataByLocation = useCallback(
    async ({ city, state, country }) => {
      return new Promise((resolve, reject) => {
        const data = members.filter((user) => {
          if (
            (!city || user.city.toLowerCase() === city.toLowerCase()) &&
            (!state || user.state.toLowerCase() === state.toLowerCase()) &&
            (!country || user.country.toLowerCase() === country.toLowerCase())
          ) {
            return true;
          }
          return false;
        });
        if (data && data.length > 0) {
          resolve(data);
        } else {
          reject(new Error("No members found!"));
        }
      });
    },
    [members]
  );

  const fetchCitiesFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const cities = members.reduce((cities, member) => {
        // const locationArr = member.location.split(",");
        // cities.push(locationArr[0]);
        cities.push(member.city);
        return cities;
      }, []);
      if (cities && cities.length > 0) {
        resolve(cities);
      } else {
        reject(new Error("No cities found!"));
      }
    });
  }, [members]);

  const fetchStatesFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const states = members.reduce((states, member) => {
        // const locationArr = member.location.split(",");
        // states.push(locationArr[1].trim());
        states.push(member.state);
        return states;
      }, []);
      if (states && states.length > 0) {
        resolve(states);
      } else {
        reject(new Error("No states found!"));
      }
    });
  }, [members]);

  const fetchCountriesFakeData = useCallback(async () => {
    return new Promise((resolve, reject) => {
      const countries = members.reduce((countries, member) => {
        countries.push(member.country);
        return countries;
      }, []);
      if (countries && countries.length > 0) {
        resolve(countries);
      } else {
        reject(new Error("No states found!"));
      }
    });
  }, [members]);

  return {
    fetchMembersFakeData,
    fetchMembersFakeDataByLocation,
    fetchCitiesFakeData,
    fetchStatesFakeData,
    fetchCountriesFakeData,
  };
};

export default useMembersFakeData;
