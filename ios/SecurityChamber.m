//
//  SecurityChamber.m
//  temp
//
//  Created by Aryan on 3/23/18.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import "SecurityChamber.h"


@implementation SecurityChamber

RCT_EXPORT_MODULE();

- (NSDictionary *)constantsToExport
{
  return @{ @"username": @"odeviceapi", @"password": @"123456789" };
}

@end
