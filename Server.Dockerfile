# Build stage
FROM node:20-alpine as build

WORKDIR /build

# Copy root package files
COPY package.json .
COPY yarn.lock .
COPY packages/mordheim-common ./packages/mordheim-common
COPY apps/server ./apps/server

RUN yarn install --pure-lockfile --non-interactive

WORKDIR /build/packages/mordheim-common
RUN yarn build

WORKDIR /build/apps/server
RUN yarn build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy root package files
COPY package.json .
COPY yarn.lock .

# Copy built files from build stage
COPY --from=build /build/node_modules /app/node_modules
COPY --from=build /build/packages/mordheim-common/dist /app/node_modules/mordheim-common
COPY --from=build /build/apps/server/dist /app/dist

ENV NODE_ENV production

# Install production dependencies
# RUN yarn install --pure-lockfile --non-interactive --production

WORKDIR /app

CMD ["node", "dist/index.js"] 
