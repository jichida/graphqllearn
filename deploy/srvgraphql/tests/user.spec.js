import { expect } from 'chai';

import * as api from './api';


describe('users', () => {
    describe('user(id: String!): User', () => {
      it('returns a user when user can be found', async () => {
        const expectedResult = {
          data: {
            user: {
              id: expectedUser.id,
              username: expectedUser.username,
              email: expectedUser.email,
              role: null,
            },
          },
        };
  
        const result = await api.user({ phonenumber: '15961125167',authcode:'1234' });
  
        expect(result.data).to.eql(expectedResult);
      });
  
      it('returns null when user cannot be found', async () => {
        const expectedResult = {
          data: {
            user: null,
          },
        };
  
        const result = await api.user({
          id: new mongoose.Types.ObjectId(),
        });
  
        expect(result.data).to.eql(expectedResult);
      });
    });