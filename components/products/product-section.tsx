"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Platform } from "../../data/models/app_configs";
import { Product } from "../../data/models/products";
import { getProducts } from "../../data/models/products";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { formatNumber } from "@/utils/formatters";
import { logEvent, EventNames } from "@/lib/analytics";

export default function ProductSection({
  platform,
  query,
  base_url,
}: {
  platform: Platform;
  query: string | null;
  base_url: string | null;
}) {
  const isInitialized = useRef(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleGetProducts = useCallback(() => {
    if (query && base_url) {
      setIsLoading(true);
      setError(null);
      getProducts({ platform, query, base_url })
        .then((productList) => {
          setProducts(productList.products);
          setIsLoading(false);
        })
        .catch((error) => {
          setError(error);
          setIsLoading(false);
        });
    }
  }, [query, base_url, platform])

  useEffect(() => {
    if (!isInitialized.current) {
      isInitialized.current = true;
      handleGetProducts();
    }
  }, [platform, query, base_url, handleGetProducts]);

  const handleErroredRetry = () => {
    logEvent(
      EventNames.ERRORED_SEARCH_RETRY,
      {
        platform: platform.name,
        query,
      },
    );
    handleGetProducts();
  }

  const handleEmptyRetry = () => {
    logEvent(
      EventNames.EMPTY_SEARCH_RETRY,
      {
        platform: platform.name,
        query,
      },
    );
    handleGetProducts();
  }

  const handleProductClick = (product: Product) => {
    logEvent(
      EventNames.PRODUCT_CLICK,
      {
        platform: platform.name,
        query,
        product_name: product.name,
        product_link: product.link,
      },
    )
  }

  const handleVisitPlatformClick = (source: 'error_state' | 'empty_state') => {
    logEvent(
      EventNames.VISIT_PLATFORM,
      {
        platform: platform.name,
        current_query: query,
        source,
      },
    )
  }

  return (
    <>
      <Container
        maxWidth="lg"
        sx={{
          px: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <Stack direction="column">
          <Stack direction="row" justifyContent="space-between" py={4}>
            <Typography
              variant="h5"
              component="h2"
              px={0}
              className="text-black"
            >
              {platform.name}
            </Typography>
            {/* <Typography component="h2">See all</Typography> */}
          </Stack>

          {error ? (
            <Stack direction="column" alignItems="center" spacing={2}>
              <Typography component="h2">
                Failed to load{" "}
                <span>
                  <Link href={platform.url} target="_blank" underline="always" onClick={() => handleVisitPlatformClick("error_state")}>
                    {platform.name}
                  </Link>
                </span>{" "}
                products.
              </Typography>
              <Typography component="caption">Error: {error}</Typography>
              <Button onClick={handleErroredRetry}>Retry</Button>
            </Stack>
          ) : (!isLoading && products.length == 0)? (
            <Stack direction="column" alignItems="center" spacing={2}>
              <Typography component="h2">
                No products found on{" "}
                <span>
                  <Link href={platform.url} target="_blank" underline="always" onClick={() => handleVisitPlatformClick("empty_state")}>
                    {platform.name}
                  </Link>
                </span>
              </Typography>
              <Button onClick={handleEmptyRetry}>Retry</Button>
            </Stack>
          ) : (
            <Grid container spacing={1}>
              {(isLoading ? Array.from(new Array(20)) : products).map(
                (product, index) => (
                  <Grid
                    item
                    xs={6}
                    sm={4}
                    md={3}
                    lg={2}
                    key={product?.link ?? index}
                  >
                    <Link
                      href={!isLoading && product ? product.link : ""}
                      underline="none"
                      target="_blank"
                      onClick={() => handleProductClick(product)}
                    >
                      <Card
                        sx={{
                          height: "100%",
                        }}
                      >
                        {isLoading ? (
                          <Skeleton height={150} width="100%" />
                        ) : (
                          <Box
                            mt={1}
                            sx={{
                              height: 150,
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <LazyLoadImage
                              src={product.image}
                              alt={product.name}
                              style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                              }}
                            />
                          </Box>
                        )}
                        <Box px={2} pb={1}>
                          {isLoading ? (
                            <Skeleton count={1} />
                          ) : (
                            <Typography
                              variant="body2"
                              component="p"
                              my={1}
                              sx={{
                                maxLines: 2,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                display: "-webkit-box",
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: "vertical",
                              }}
                            >
                              {product.name}
                            </Typography>
                          )}
                          <Stack direction="row" justifyContent="space-between">
                            <Stack>
                              {isLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                 (
                                  product.old_price && <Typography
                                    variant="caption"
                                    component="span"
                                    sx={{
                                      textDecoration: "line-through",
                                      color: "text.disabled",
                                    }}
                                  >
                                    {product.old_price.currency}
                                    {product.old_price.amount ? formatNumber(product.old_price.amount) :
                                      product.old_price?.amount_range}
                                  </Typography>
                                )
                              )}
                              {isLoading ? (
                                <Skeleton width={100} />
                              ) : (
                                product.price && <Typography component="h2" fontWeight={600}>
                                  {product.price.currency}
                                  {product.price.amount ? formatNumber(product.price.amount) :
                                    product.price?.amount_range}
                                </Typography>
                              )}
                            </Stack>
                            {isLoading ? (
                              <Skeleton width={100} />
                            ) : (
                              product.rating &&
                              product.reviews && (
                                <Stack direction="row">
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      component="span"
                                    >
                                      {product.rating}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <StarBorderIcon fontSize="small" />
                                  </Box>
                                  <Box>
                                    <Typography
                                      variant="caption"
                                      component="span"
                                    >
                                      {product.reviews}
                                    </Typography>
                                  </Box>
                                </Stack>
                              )
                            )}
                          </Stack>
                        </Box>
                      </Card>
                    </Link>
                  </Grid>
                )
              )}
            </Grid>
          )}
        </Stack>
      </Container>
    </>
  );
};
